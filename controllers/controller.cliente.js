import {
  obtenerCliente,
  clientecedula,
  clienteTelefono,
  clienteNombre,
  clienteCreditoVencido,
  cliente_cred_activo,
  getMorosos,
  historial_pagos,
  crearCl,
  putCl,
  deletecl,
  creditoxCl,
} from "../models/cliente.model.js";

export const getCliente = async (req, res) => {
  try {
    const clientes = await obtenerCliente();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const clientexCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const cliente = await clientecedula(cedula);
    if (cliente.length == 0) {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error " });
  }
};

export const filtroxTelefono = async (req, res) => {
  try {
    const { telefono } = req.params;
    const cliente = await clienteTelefono(telefono);
    if (cliente.length == 0) {
      res.status(404).json({
        error: "No se encuentra el cliente por este número telefonico",
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const filtroxNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const cliente = await clienteNombre(nombre);
    if (cliente.length == 0) {
      res.status(404).json({ error: "No se encontraron datos" });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const creditoVencido = async (req, res) => {
  try {
    const clientes = await clienteCreditoVencido();
    if (clientes.length === 0) {
      res.status(404).json({ error: "Algo falló." });
    }
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const creditoActivo = async (req, res) => {
  try {
    const cliente = await cliente_cred_activo();
    if (cliente.length === 0) {
      res.status(500).json({ error: "Error con encontrar los datos" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

export const getmoroso = async (req, res) => {
  try {
    const clientes = await getMorosos();
    if (clientes.length === 0) {
      res.send(404).send("Parece que no tenemos aun clientes morosos.");
    }
    res.json(clientes);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const getHistory = async (req, res) => {
  try {
    const pagos = await historial_pagos();
    if (pagos.length === 0) {
      res.status(404).send("No hay un registro de pagos.");
    }
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const crearCliente = async (req, res) => {
  try {
    const datos = req.body;
    const clientepost = await crearCl(datos);
    if (!clientepost) {
      res.status(400).send("Hubo un error creando al cliente");
    }
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: clientepost,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const dataPut = req.body;
    const data = await putCl(dataPut);
    if (!data) {
      res.json("Hubo un error actualizando los datos.");
    }
    res.status(201).json({
      message: "Actualizado correctamente",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const borrarCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const data = await deletecl(id_cliente);

    if (data === null) {
      res.json("Error borrando al cliente");
    }
    res.status(200).json({
      message: "Borrado correctamente",
      data: data,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const creditoxcliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const response = await creditoxCl(id_cliente);

    if (!response || response.length === 0) {
      res.json("Hubo un error en el proceso");
    }

    res.status(200).send({ message: "Exito", data: response });
  } catch (error) {
    res.json(`Error: ${error}`);
  }
};
