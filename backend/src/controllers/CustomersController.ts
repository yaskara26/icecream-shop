import { Request, Response } from "express";

import CustomersService from "../services/CustomersService";
import ApplicationError from "../errors/ApplicationError";

export async function createCustomer(request: Request, response: Response): Promise<Response> {
  const { name, cpf, email, telephone, birthday } = request.body;

  try {
    const customersService = new CustomersService();
    const customer = await customersService.create({ name, cpf, email, telephone, birthday: new Date(birthday) });

    return response.json(customer);
  } catch (err) {
    let message = "Unknow Error.";
    if (err instanceof ApplicationError) {
      message = err.message;
    }
    return response.json({ error: message });
  }
}

export async function findCustomerById(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;

  const customersService = new CustomersService();
  const customer = await customersService.find(id);

  return response.json(customer);
}

export async function updateCustomer(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;
  const { name, cpf, email, telephone, birthday } = request.body;

  const customersService = new CustomersService();
  const customer = await customersService.update({ id, name, cpf, email, telephone, birthday });

  return response.json(customer);
}

export async function removeCustomer(request: Request, response: Response): Promise<Response> {
  const { id } = request.params;

  const customersService = new CustomersService();
  const customer = await customersService.remove(id);

  return response.json(customer);
}

export async function listCustomers(request: Request, response: Response): Promise<Response> {
  const customersService = new CustomersService();
  const customers = await customersService.list();

  return response.json(customers);
}
