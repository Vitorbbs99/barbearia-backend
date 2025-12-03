import { Router } from "express";
import { PlanosController } from "../controllers/planos.controller.js";

const router = Router();

router.get("/", PlanosController.getAll);
router.post("/", PlanosController.create);
router.put("/:id", PlanosController.update);
router.delete("/", PlanosController.delete);

export default router;
