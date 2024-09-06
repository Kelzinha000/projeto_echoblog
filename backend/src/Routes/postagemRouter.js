import { Router } from "express";
import { buscarPostagemPorId } from "../../Controller/postagemController.js";

import { criarPostagem, getTodosPostagens} from "../Controller/postagemController.js";

const router = Router()
router.post("/postagens", criarPostagem)
router.get("/postagens", getTodosPostagens)
router.get("/postagens/:id", buscarPostagemPorId)



export default router;