import 'dotenv/config';
import "reflect-metadata";
import './database';
// import '../ormconfig.json';

import express from "express";

import routes from "./routes";
import createDatabaseConnection from './database';

const server = express();

createDatabaseConnection();

server.use(express.json());

server.use(routes);

const port = 3000;

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
