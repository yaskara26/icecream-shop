import { Router } from "express";

import { createCustomer, findCustomerById, listCustomers, removeCustomer, updateCustomer } from "../controllers/CustomersController";

const customersRoutes = Router();

customersRoutes.post('/', createCustomer);
customersRoutes.get('/:id', findCustomerById);
customersRoutes.put('/:id', updateCustomer);
customersRoutes.delete('/:id', removeCustomer);
customersRoutes.get('/', listCustomers);

export default customersRoutes;