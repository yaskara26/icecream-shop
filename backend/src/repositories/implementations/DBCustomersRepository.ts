import { Repository, getRepository } from "typeorm";

import CustomerDTO from "../../dtos/CustomerDTO";
import Customer from "../../entities/typeorm/Customer";
import ICustomersRepository from "../ICustomersRepository";

class DBCustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>

  constructor() {
    this.repository = getRepository(Customer);
  }

  async create(customerDTO: CustomerDTO): Promise<CustomerDTO> {
    let customer = await this.repository.create(customerDTO);

    customer = await this.repository.save(customer);

    return Object.assign(new CustomerDTO(), customer);
  }

  async findById(id: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ id });

    return customer ? Object.assign(new CustomerDTO(), customer) : null;
  }

  async findByCpf(cpf: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ cpf });

    return customer ? Object.assign(new CustomerDTO(), customer) : null;
  }

  async update(customerDTO: CustomerDTO): Promise<CustomerDTO | null> {
    // const customer = await this.repository.findOneBy({ id: customerDTO.id });

    // customer.cpf = '';

    // Object.assign(customer, customerDTO)

    await this.repository.update({ id: customerDTO.id }, customerDTO);

    const customer = await this.repository.findOne({ id: customerDTO.id });

    return customer ? Object.assign(new CustomerDTO(), customer) : null;
  }

  async remove(id: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ id });

    await this.repository.remove(customer);

    return customer ? Object.assign(new CustomerDTO(), customer) : null;
  }

  async list(): Promise<CustomerDTO[]> {
    return await this.repository.find();
  }
}

export default DBCustomersRepository;
