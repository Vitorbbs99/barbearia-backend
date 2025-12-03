import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  login: async (req, res) => {
    const { usuario, senha } = req.body;

    const user = await AuthService.login(usuario, senha);

    if (!user) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Usuário ou senha inválidos",
      });
    }

    res.json({ sucesso: true, ...user });
  },
};
