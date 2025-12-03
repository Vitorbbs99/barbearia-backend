import { PlanosRepository } from "../repositories/planos.repository.js";

export const PlanosService = {
  getAll: () => PlanosRepository.findAll(),
  create: (data) => PlanosRepository.create(data),
  update: (id, data) => PlanosRepository.update(id, data),
  delete: (id) => PlanosRepository.delete(id),
};
