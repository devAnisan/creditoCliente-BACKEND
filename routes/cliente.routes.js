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
  creditoxcliente,
} from "../controllers/controller.cliente.js";
const route = Router();

route.get("/", getCliente);
route.get("/creditovencido", creditoVencido);
route.get("/creditoactive", creditoActivo);
route.get("/history", getHistory);
route.get("/morosos", getmoroso);

route.get("/cl/:id_cliente", creditoxcliente);
route.get("/by-cedula/:cedula", clientexCedula);
route.get("/by-nombre/:nombre", filtroxNombre);
route.get("/by-telefono/:telefono", filtroxTelefono);

route.post("/", crearCliente);
route.put("/:cedula", actualizarCliente);
route.delete("/:id_cliente", borrarCliente);

export default route;
