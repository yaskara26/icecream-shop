import EmployeeDTO from "../dtos/EmployeeDTO";

interface IEmployeesRepository {
  create(employeeDTO: EmployeeDTO): Promise<EmployeeDTO>;

  findByCpf(cpf: string): Promise<EmployeeDTO | null>;

  findById(id: string): Promise<EmployeeDTO | null>;

  update(employeeDTO: EmployeeDTO): Promise<EmployeeDTO | null>;

  remove(id: string): Promise<EmployeeDTO | null>;

  list(): Promise<EmployeeDTO[]>;
}

export default IEmployeesRepository;
