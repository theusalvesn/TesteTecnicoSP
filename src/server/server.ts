import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes";

dotenv.config();

const server = express();

server.use(express.json());
server.use(router);

export { server}