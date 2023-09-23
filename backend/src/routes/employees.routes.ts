import { Router } from "express";

import { createEmployee, findEmployeeById, listEmployees, removeEmployee, updateEmployee } from "../controllers/EmployeesController";

const employeesRoutes = Router();

employeesRoutes.post('/', createEmployee);
employeesRoutes.get('/:id', findEmployeeById);
employeesRoutes.put('/:id', updateEmployee);
employeesRoutes.delete('/:id', removeEmployee);
employeesRoutes.get('/', listEmployees);

export default employeesRoutes;