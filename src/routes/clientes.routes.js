import { Router } from "express";
import { ClientesController } from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", ClientesController.getAll);
router.post("/", ClientesController.create);
router.put("/:id", ClientesController.update);
router.delete("/", ClientesController.delete);

export default router;
