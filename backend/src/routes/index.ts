import { Router } from "express";
import customersRoutes from "./customers.routes";
import employeesRoutes from "./employees.routes";

const routes = Router();

routes.use('/customers', customersRoutes);
routes.use('/employees', employeesRoutes);

export default routes;
