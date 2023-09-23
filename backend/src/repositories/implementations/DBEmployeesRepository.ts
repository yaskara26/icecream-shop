import { Repository, getRepository } from "typeorm";

import EmployeeDTO from "../../dtos/EmployeeDTO";
import Employee from "../../entities/typeorm/Employee";
import IEmployeesRepository from "../IEmployeesRepository";

class DBEmployeesRepository implements IEmployeesRepository {
  private repository: Repository<Employee>

  constructor() {
    this.repository = getRepository(Employee);
  }

  async create(employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const employee = await this.repository.create(employeeDTO);

    const { id, name, cpf, email, telephone, birthday } = await this.repository.save(employee);

    return Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday });
  }

  async findById(employeeId: string): Promise<EmployeeDTO | null> {
    const employee = await this.repository.findOne({ id: employeeId });

    if (employee) {
      const { id, name, cpf, email, telephone, birthday } = employee;

      return Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday });
    }

    return null;
  }

  async findByCpf(employeeCpf: string): Promise<EmployeeDTO | null> {
    const employee = await this.repository.findOne({ cpf: employeeCpf });

    if (employee) {
      const { id, name, cpf, email, telephone, birthday } = employee;

      return Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday });
    }

    return null;
  }

  async update(employeeDTO: EmployeeDTO): Promise<EmployeeDTO | null> {
    await this.repository.update({ id: employeeDTO.id }, employeeDTO);

    const { id, name, cpf, email, telephone, birthday } = await this.repository.findOne({ id: employeeDTO.id });

    return id ? Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday }) : null;
  }

  async remove(employeeId: string): Promise<EmployeeDTO | null> {
    const employee = await this.repository.findOne({ id: employeeId });
    const { id, name, cpf, email, telephone, birthday } = employee;

    await this.repository.remove(employee);

    return id ? Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday }) : null;
  }

  async list(): Promise<EmployeeDTO[]> {
    const employees = await this.repository.find();

    return employees.map(({ id, name, cpf, email, telephone, birthday }) => Object.assign(new EmployeeDTO(), { id, name, cpf, email, telephone, birthday }));
  }
}

export default DBEmployeesRepository;
