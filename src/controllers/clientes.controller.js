import { ClientesService } from "../services/clientes.service.js";

export const ClientesController = {
  getAll: async (req, res) => {
    const data = await ClientesService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const id = await ClientesService.create(req.body);
    res.json({ sucesso: true, id });
  },

  update: async (req, res) => {
    await ClientesService.update(req.params.id, req.body);
    res.json({ sucesso: true });
  },

  delete: async (req, res) => {
    await ClientesService.delete(req.body.id);
    res.json({ sucesso: true });
  },
};
