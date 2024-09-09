import { Router } from "express";
import {criarUsuario, getAdm} from "../Controller/usuarioController.js"
const router = Router()

router.post("/registro", criarUsuario)
router.get("/adm", getAdm)


export default router;