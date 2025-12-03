import { connection } from "../config/db.js";

export const UsuariosRepository = {
  findByLogin: async (usuario, senha) => {
    const [rows] = await connection.query(
      "SELECT id, usuario, nome FROM usuarios WHERE usuario = ? AND senha = ?",
      [usuario, senha]
    );
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  update: async (id, data) => {
    await connection.query(
      "UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id = ?",
      [data.nome, data.senha, data.email, id]
    );
  },
};
