import CustomerDTO from "../dtos/CustomerDTO";

interface ICustomersRepository {
  create(customerDTO: CustomerDTO): Promise<CustomerDTO>;

  findById(id: string): Promise<CustomerDTO | null>;

  findByCpf(cpf: string): Promise<CustomerDTO | null>;

  update(customerDTO: CustomerDTO): Promise<CustomerDTO | null>;

  remove(id: string): Promise<CustomerDTO | null>;

  list(): Promise<CustomerDTO[]>;
}

export default ICustomersRepository;
