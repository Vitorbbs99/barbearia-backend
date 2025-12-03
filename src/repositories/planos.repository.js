import { connection } from "../config/db.js";

export const PlanosRepository = {
  findAll: async () => {
    const [rows] = await connection.query("SELECT * FROM planos");
    return rows;
  },

  create: async (data) => {
    const [result] = await connection.query(
      "INSERT INTO planos (titulo, valor, texto) VALUES (?, ?, ?)",
      [data.titulo, data.valor, data.texto]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    await connection.query(
      "UPDATE planos SET titulo = ?, valor = ?, texto = ? WHERE id = ?",
      [data.titulo, data.valor, data.texto, id]
    );
  },

  delete: async (id) => {
    await connection.query("DELETE FROM planos WHERE id = ?", [id]);
  },
};
