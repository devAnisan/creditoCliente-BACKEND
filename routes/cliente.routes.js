import {Router} from 'express'
import {
  getCliente,
  clientexCedula,
  filtroxTelefono,
  filtroxNombre,
  creditoVencido,
  creditoActivo,
  getmoroso,
  getHistory}
  from '../controllers/controller.cliente.js'
const route = Router()

route.get('/', getCliente) // Trae a TODOS los clientes
route.get('/creditovencido', creditoVencido) // Muestra los creditos vencidos <= 0
route.get('/creditoactive', creditoActivo) // creditos activos
route.get('/history', getHistory) // Historial de pagos
route.get('/morosos', getmoroso) // Clientes morosos plazo de dias <= 0
route.get('/:cedula', clientexCedula) // Cliente por cedula (Busqueda)
route.get('/:nombre', filtroxNombre) // Cliente por Nombre (Busqueda)
route.get('/:telefono', filtroxTelefono) // Cliente por telefono (Busqueda)
// route.post('/', crearCliente)
// route.put('/:cedula', actualizarCliente)
// route.delete('/:cedula', borrarCliente)


export default route
