import CustomerDTO from "../dtos/CustomerDTO";
import AlreadyExistsError from "../errors/AlreadyExistsError";
import DoesNotExistsError from "../errors/DoesNotExistsError";
import ICustomersRepository from "../repositories/ICustomersRepository";
import DBCustomersRepository from "../repositories/implementations/DBCustomersRepository";

class CustomersService {
  private repository: ICustomersRepository;

  constructor() {
    this.repository = new DBCustomersRepository();
  }

  async create(customerDTO: CustomerDTO): Promise<CustomerDTO> {
    const customerExists = await this.repository.findByCpf(customerDTO.cpf);

    if (customerExists) {
      throw new AlreadyExistsError("Customer already exists!");
    }

    return await this.repository.create(customerDTO);
  }

  async find(id: string): Promise<CustomerDTO> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new DoesNotExistsError("Customer does not exists!");
    }

    return customer;
  }

  async update(customerDTO: CustomerDTO): Promise<CustomerDTO> {
    const { id } = customerDTO;
    let customer = await this.repository.findById(id);

    if (!customer) {
      throw new DoesNotExistsError("Customer does not exists!");
    }

    if (customer.cpf !== customerDTO.cpf) {
      const customerExists = await this.repository.findByCpf(customerDTO.cpf);

      if (customerExists) {
        throw new AlreadyExistsError("This cpf is already in use!");
      }
    }

    customer = Object.assign(customer, customerDTO);

    return await this.repository.update(customer);
  }

  async remove(id: string): Promise<CustomerDTO> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new DoesNotExistsError("Customer does not exists!");
    }

    return await this.repository.remove(id);
  }

  async list(): Promise<CustomerDTO[]> {
    return await this.repository.list();
  }
}

export default CustomersService;
