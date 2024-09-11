import { Router } from "express";
import { buscarPostagemPorId } from "../Controller/postagemController.js";

import { criarPostagem, getTodosPostagens} from "../Controller/postagemController.js";
import imageUpload from "../helpers/imageUploadZod.js";

const router = Router()
router.post("/postagens", imageUpload.single("imagem"),criarPostagem)
router.get("/postagens", getTodosPostagens)
router.get("/postagens/:id", buscarPostagemPorId)



export default router;