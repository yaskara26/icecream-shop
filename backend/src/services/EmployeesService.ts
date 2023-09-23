import EmployeeDTO from "../dtos/EmployeeDTO";
import AlreadyExistsError from "../errors/AlreadyExistsError";
import DoesNotExistsError from "../errors/DoesNotExistsError";
import IEmployeesRepository from "../repositories/IEmployeesRepository";
import DBEmployeesRepository from "../repositories/implementations/DBEmployeesRepository";

class EmployeesService {
  private repository: IEmployeesRepository;

  constructor() {
    this.repository = new DBEmployeesRepository();
  }

  async create(employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const employeeExists = await this.repository.findByCpf(employeeDTO.cpf);

    if (employeeExists) {
      throw new AlreadyExistsError('Employee already exists!');
    }

    return await this.repository.create(employeeDTO);
  }

  async find(id: string): Promise<EmployeeDTO> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new DoesNotExistsError("employee does not exists!")
    }

    return employee;
  }

  async update(employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const { id } = employeeDTO;
    let employee = await this.repository.findById(id);

    if (!employee) {
      throw new DoesNotExistsError("Employee does not exists!");
    }

    if (employee.cpf !== employeeDTO.cpf) {
      const employeeExists = await this.repository.findByCpf(employeeDTO.cpf);

      if (employeeExists) {
        throw new AlreadyExistsError("This cpf is already in use!");
      }
    }

    employee = Object.assign(employee, employeeDTO);

    return await this.repository.update(employee);
  }

  async remove(id: string): Promise<EmployeeDTO> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new DoesNotExistsError("This employee does not exists!")
    }

    return await this.repository.remove(id);
  }

  async list(): Promise<EmployeeDTO[]> {
    return await this.repository.list();
  }
}

export default EmployeesService;
