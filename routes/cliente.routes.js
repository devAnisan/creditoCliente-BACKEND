import {Router} from 'express'
import { getCliente } from '../controllers/controller.cliente.js'
const route = Router()

route.get('/', getCliente)
route.get('/:cedula', clientexCedula)
route.get('/creditovencido', creditoVencido)
route.get('/creditoactive', creditoActivo)
route.get('/:nombre', filtroxNombre)
route.get('/:telefono', filtroxTelefono)
route.get('/morosos', getmoroso)
route.get('/history', getHistory)
route.post('/', crearCliente)
route.put('/:cedula', actualizarCliente)
route.delete('/:cedula', borrarCliente)


export default route
