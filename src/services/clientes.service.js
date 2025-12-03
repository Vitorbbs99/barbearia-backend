import { ClientesRepository } from "../repositories/clientes.repository.js";

export const ClientesService = {
  getAll: () => ClientesRepository.findAll(),
  create: (data) => ClientesRepository.create(data),
  update: (id, data) => ClientesRepository.update(id, data),
  delete: (id) => ClientesRepository.delete(id),
};
