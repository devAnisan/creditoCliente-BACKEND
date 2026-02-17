import express from "express";
import cors from "cors";
import clienteRoute from "./routes/cliente.routes.js";
const app = express();

app.use(
  cors({
    origin: "https://creditos-management.web.app",
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api/clientes", clienteRoute);

export default app;
