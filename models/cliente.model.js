import {db} from '../src/config/db.js'

export const obtenerCliente = async () => {
  const [rows] = await db.query('select * from cliente;')
  return rows;
}
