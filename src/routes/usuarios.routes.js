import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/:id", UsuariosController.getById);
router.put("/:id", UsuariosController.update);

export default router;
