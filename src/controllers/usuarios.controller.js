import { UsuariosService } from "../services/usuarios.service.js";

export const UsuariosController = {
  getById: async (req, res) => {
    const data = await UsuariosService.findById(req.params.id);
    res.json(data);
  },

  update: async (req, res) => {
    await UsuariosService.update(req.params.id, req.body);
    res.json({ sucesso: true });
  },
};
