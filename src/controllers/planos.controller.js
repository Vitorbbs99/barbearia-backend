import { PlanosService } from "../services/planos.service.js";

export const PlanosController = {
  getAll: async (req, res) => {
    const data = await PlanosService.getAll();
    res.json(data);
  },

  create: async (req, res) => {
    const id = await PlanosService.create(req.body);
    res.json({ sucesso: true, id });
  },

  update: async (req, res) => {
    await PlanosService.update(req.params.id, req.body);
    res.json({ sucesso: true });
  },

  delete: async (req, res) => {
    await PlanosService.delete(req.body.id);
    res.json({ sucesso: true });
  },
};
