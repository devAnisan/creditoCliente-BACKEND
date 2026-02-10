import { db } from "../src/config/db.js";

export const obtenerCliente = async () => {
  const [rows] = await db.query("select * from Cliente;");
  return rows;
};

export const clientecedula = async (cedula) => {
  const [rows] = await db.query("SELECT * FROM cliente WHERE id_cliente = ?", [
    cedula,
  ]);
  return rows;
};

export const clienteTelefono = async (telefono) => {
  const [rows] = await db.query("SELECT * FROM cliente WHERE telefono = ?", [
    telefono,
  ]);
  return rows;
};

export const clienteNombre = async (nombre) => {
  const [rows] = await db.query("SELECT * FROM cliente WHERE nombre = ?", [
    nombre,
  ]);
  return rows;
};

export const clienteCreditoVencido = async () => {
  const [rows] = await db.query(`
    SELECT cl.id_cliente, cl.nombre,
      MAX(p.fecha_pago) AS ultimo_pago,
      DATEDIFF(DATE_ADD(MAX(p.fecha_pago), INTERVAL 15 DAY), CURDATE()) AS dias_vencer
    FROM credito c
    JOIN
      cliente cl ON c.id_cliente = cl.id_cliente
    LEFT JOIN
      pago p ON c.id_credito = p.id_credito
    GROUP BY
      c.id_credito, cl.id_cliente, cl.nombre
    HAVING DATEDIFF(DATE_ADD(MAX(p.fecha_pago), INTERVAL 15 DAY), CURDATE()) <= 15;
    `);
  return rows;
};

export const cliente_cred_activo = async () => {
  const [rows] = await db.query(`SELECT
	cl.cedula,
    cl.nombre,
    c.estado,
    c.montoCredito,
    c.montoRestante
  FROM Credito c
  INNER JOIN Cliente cl ON c.cedula = cl.cedula;
`);

  return rows;
};

export const getMorosos = async () => {
  const [rows] = await db.query(`
    SELECT
      cl.id_cliente,
      cl.nombre,
    MAX(p.fecha_pago) AS fecha_ultimo_pago,
    DATEDIFF(DATE_ADD(MAX(p.fecha_pago), INTERVAL 15 DAY), CURDATE()) AS dias_para_vencer
    FROM credito c
    JOIN cliente cl ON c.id_cliente = cl.id_cliente
    LEFT JOIN pago p ON c.id_credito = p.id_credito
    GROUP BY c.id_credito, cl.id_cliente, cl.nombre
    HAVING DATEDIFF(DATE_ADD(MAX(p.fecha_pago), INTERVAL 15 DAY), CURDATE()) <= 0;`);
  return rows;
};
export const historial_pagos = async () => {
  const [rows] = await db.query(`
    SELECT
      cl.nombre,
        p.fecha_pago,
        p.monto_pago,
        p.metodo_pago
    FROM
      pago p
    JOIN
      credito c on p.id_credito = c.id_credito
    LEFT JOIN
      cliente cl on c.id_cliente = cl.id_cliente;
    `);

  return rows;
};

export const crearCl = async (datos) => {
  const { cedula, nombre, apellido, telefono, email, direccion } = datos;
  const [rows] = await db.query(
    ` INSERT INTO
        Cliente (cedula, nombre, apellido, telefono, email, direccion)
      VALUES
        (?, ?, ?, ?, ?, ?);
    `,
    [cedula, nombre, apellido, telefono, email, direccion],
  );
  return rows.affectedRows > 0
    ? { id_cliente: rows.id_cliente, ...rows }
    : null;
};

export const putCl = async (datos) => {
  const { cedula, nombre, apellido, telefono, email, direccion } = datos;
  const [rows] = await db.query(
    `
    UPDATE Cliente
    SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ?
    WHERE cedula = ?;
    `,
    [nombre, apellido, telefono, email, direccion, cedula],
  );
  return rows.affectedRows > 0
    ? { nombre, apellido, telefono, email, direccion }
    : null;
};

export const deletecl = async (cedula) => {
  const [rows] = await db.query(
    `DELETE FROM Cliente
    WHERE cedula = ?;
    `,
    [cedula],
  );
  return rows.affectedRows > 0 ? rows : null;
};

export const creditoxCl = async (cedula) => {
  const [rows] = await db.query(
    `
    SELECT COUNT(*) AS CantidadCredito
    FROM Credito
    WHERE cedula = ?
    `,
    [cedula],
  );
  return rows[0].CantidadCredito;
};

export const model_creditos = async () => {
  const [rows] = await db.query(`
  SELECT *
  FROM Credito
  `);
  return rows;
};

export const CrearPago = async (datos) => {
  const { creditID, fechaPago, montoDePago, metodoPago } = datos;
  const [rows] = await db.query(
    `
    INSERT INTO Pago (creditID, fechaPago, montoDePago, metodoPago)
    VALUES (?, ?, ?, ?);
    `,
    [creditID, fechaPago, montoDePago, metodoPago],
  );
  return rows.affectedRows > 0 ? { ...datos } : null;
};
