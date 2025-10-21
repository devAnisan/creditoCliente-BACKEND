import { obtenerCliente } from '../models/cliente.model.js'

export const getCliente = async (req, res) => {
  try{
    const clientes = await (obtenerCliente())
    res.json(clientes)
  }catch(error) {
    res.status(500).json({ error: "Error"})
  }
}
