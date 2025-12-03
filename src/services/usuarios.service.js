import { UsuariosRepository } from "../repositories/usuarios.repository.js";

export const UsuariosService = {
  findById: (id) => UsuariosRepository.findById(id),
  update: (id, data) => UsuariosRepository.update(id, data),
};
