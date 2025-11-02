import { Router } from "express";
import {
  getCliente,
  clientexCedula,
  filtroxTelefono,
  filtroxNombre,
  creditoVencido,
  creditoActivo,
  getmoroso,
  getHistory,
  crearCliente,
  actualizarCliente,
  borrarCliente,
} from "../controllers/controller.cliente.js";
const route = Router();

route.get("/", getCliente);
route.get("/creditovencido", creditoVencido);
route.get("/creditoactive", creditoActivo);
route.get("/history", getHistory);
route.get("/morosos", getmoroso);
route.get("/:cedula", clientexCedula);
route.get("/:nombre", filtroxNombre);
route.get("/:telefono", filtroxTelefono);
route.post("/", crearCliente);
route.put("/:cedula", actualizarCliente);
route.delete("/:cedula", borrarCliente);

export default route;
