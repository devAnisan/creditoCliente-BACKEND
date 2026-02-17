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
  creditos,
  crearpago,
} from "../controllers/controller.cliente.js";
const route = Router();

route.get("/cls/:uid", getCliente);
route.get("/creditovencido", creditoVencido);
route.get("/creditoactive", creditoActivo);
route.get("/history", getHistory);
route.get("/morosos", getmoroso);

route.get("/cl/:id_cliente", creditoxcliente);
route.get("/by-cedula/:cedula", clientexCedula);
route.get("/by-nombre/:nombre", filtroxNombre);
route.get("/by-telefono/:telefono", filtroxTelefono);

route.post("/", crearCliente);
route.post("/pago", crearpago);
route.put("/:cedula", actualizarCliente);
route.delete("/:id_cliente", borrarCliente);

route.get("/credito/general", creditos);

export default route;
