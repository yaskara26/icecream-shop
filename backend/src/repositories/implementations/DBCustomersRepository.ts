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
    const customer = await this.repository.create(customerDTO);

    const { id, name, cpf, email, telephone, birthday } = await this.repository.save(customer);

    return Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday });
  }

  async findById(customerId: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ id: customerId });

    if (customer) {
      const { id, name, cpf, email, telephone, birthday } = customer;

      return Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday });
    }

    return null;
  }

  async findByCpf(customerCpf: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ cpf: customerCpf });

    if (customer) {
      const { id, name, cpf, email, telephone, birthday } = customer;

      return Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday });
    }

    return null;
  }

  async update(customerDTO: CustomerDTO): Promise<CustomerDTO | null> {
    await this.repository.update({ id: customerDTO.id }, customerDTO);

    const { id, name, cpf, email, telephone, birthday } = await this.repository.findOne({ id: customerDTO.id });

    return id ? Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday }) : null;
  }

  async remove(customerId: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findOne({ id: customerId });
    const { id, name, cpf, email, telephone, birthday } = customer;

    await this.repository.remove(customer);

    return id ? Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday }) : null;
  }

  async list(): Promise<CustomerDTO[]> {
    const customers = await this.repository.find();

    return customers.map(({ id, name, cpf, email, telephone, birthday }) => Object.assign(new CustomerDTO(), { id, name, cpf, email, telephone, birthday }));
  }
}

export default DBCustomersRepository;
