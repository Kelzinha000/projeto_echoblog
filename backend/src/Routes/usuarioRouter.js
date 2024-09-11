import { Router } from "express";
import {criarUsuario, getAdm, atualizarPerfil} from "../Controller/usuarioController.js"
const router = Router()

router.post("/registro", criarUsuario)
router.get("/adm", getAdm)
router.get("/",atualizarPerfil)


export default router;