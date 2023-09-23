import { Request, Response } from "express";

import EmployeesService from "../services/EmployeesService";
import ApplicationError from "../errors/ApplicationError";

export async function createEmployee(request: Request, response: Response): Promise<Response> {
  const { name, cpf, email, telephone, birthday } = request.body;

  try {
    const employeesService = new EmployeesService();
    const employee = await employeesService.create({ name, cpf, email, telephone, birthday: new Date(birthday) });

    return response.json(employee);
  } catch (err) {
    let message = "Unknow Error.";
    if (err instanceof ApplicationError) {
      message = err.message;
    }
    return response.json({ error: message });
  }
}

export async function findEmployeeById(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;

  const employeesService = new EmployeesService();
  const employee = await employeesService.find(id);

  return response.json(employee);
}

export async function updateEmployee(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;
  const { name, cpf, email, telephone, birthday } = request.body;

  const employeesService = new EmployeesService();
  const employee = await employeesService.update({ id, name, cpf, email, telephone, birthday });

  return response.json(employee);
}

export async function removeEmployee(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;

  const employeesService = new EmployeesService();
  const employee = await employeesService.remove(id);

  return response.json(employee);
}

export async function listEmployees(request: Request, response: Response): Promise<Response> {
  const employeesService = new EmployeesService();
  const employee = await employeesService.list();

  return response.json(employee);
}
