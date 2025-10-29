import { obtenerCliente,
  clientecedula,
  clienteTelefono,
  clienteNombre,
  clienteCreditoVencido,
  cliente_cred_activo,
  getMorosos,
  historial_pagos }
  from '../models/cliente.model.js'

export const getCliente = async (req, res) => {
  try{
    const clientes = await (obtenerCliente())
    res.json(clientes)
  }catch(error) {
    res.status(500).json({ error: "Error"})
  }
}

export const clientexCedula = async (req, res) => {
  try {
    const {cedula} = req.params
    const cliente = await (clientecedula(cedula))
    if (cliente.length == 0){
      res.status(404).json({ error: 'Cliente no encontrado'})
    }
    res.json(cliente)
  } catch(error) {
    res.status(500).json({ error: "Error "})
  }
}

export const filtroxTelefono = async (req, res) => {
  try {
    const { telefono } = req.params
    const cliente = await (clienteTelefono(telefono))
    if (cliente.length == 0) {
      res.status(404).json({error: 'No se encuentra el cliente por este número telefonico'})
    }

    res.json(cliente)
  } catch(error) {
    res.status(500).json({error: error})
  }
}


export const filtroxNombre = async (req, res) => {
  try {
    const {nombre} = req.params
    const cliente = await (clienteNombre(nombre))
    if (cliente.length == 0) {
      res.status(404).json({error: 'No se encontraron datos'})
    }

    res.json(cliente)
  }catch(error) {
    res.status(500).json({error: error})
  }
}


export const creditoVencido = async (req, res) => {
  try {
    const clientes = await (clienteCreditoVencido())
    if(clientes.length === 0) {
      res.status(404).json({'error': 'Algo falló.'})
    }
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ error: error})
  }
}
export const creditoActivo = async (req, res) => {
  try {
    const cliente = await (cliente_cred_activo())
    if (cliente.length === 0) {
      res.status(500).json({'error': 'Error con encontrar los datos'})
    }
    res.json(cliente)
  } catch (error) {
    res.status(404).send({error: error})
  }
}

export const getmoroso = async (req, res) => {
  try {
    const clientes = await (getMorosos())
    if (clientes.length === 0) {
      res.send(404).send('Parece que no tenemos aun clientes morosos.')
    }
    res.json(clientes)
  } catch (error) {
    res.status(500).send({error: error})
  }
}

export const getHistory = async (req, res) => {
  try {
    const pagos = await (historial_pagos())
    if (pagos.length === 0) {
      res.status(404).send('No hay un registro de pagos.')
    }
    res.json(pagos)
  } catch (error) {
    res.status(500).json({error: error})
  }hola
}
