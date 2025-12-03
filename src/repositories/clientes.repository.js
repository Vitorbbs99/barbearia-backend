import { connection } from "../config/db.js";

export const ClientesRepository = {
  findAll: async () => {
    const [rows] = await connection.query("SELECT * FROM clientes");
    return rows;
  },

  create: async (data) => {
    const [result] = await connection.query(
      "INSERT INTO clientes (nome, telefone, idPlano, status) VALUES (?, ?, ?, ?)",
      [data.nome, data.telefone, data.idPlano, data.status ?? 1]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    await connection.query(
      "UPDATE clientes SET nome = ?, telefone = ?, idPlano = ?, status = ? WHERE id = ?",
      [data.nome, data.telefone, data.idPlano, data.status ?? 1, id]
    );
  },

  delete: async (id) => {
    await connection.query("DELETE FROM clientes WHERE id = ?", [id]);
  },
};
