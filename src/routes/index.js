import { Router } from "express";
import clientesRoutes from "./clientes.routes.js";
import planosRoutes from "./planos.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/clientes", clientesRoutes);
router.use("/planos", planosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/", authRoutes);

export default router;
