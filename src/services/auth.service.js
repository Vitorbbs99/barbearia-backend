import { UsuariosRepository } from "../repositories/usuarios.repository.js";

export const AuthService = {
  login: async (usuario, senha) => {
    const user = await UsuariosRepository.findByLogin(usuario, senha);
    if (!user) return null;

    return {
      ...user,
      token: "fake-token-" + Math.random().toString(36).substring(2, 9),
    };
  },
};
