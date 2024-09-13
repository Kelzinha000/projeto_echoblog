import { Router } from "express";
import {criarUsuario, getAdm, atualizarPerfil, login} from "../Controller/usuarioController.js"
const router = Router()

router.post("/registro", criarUsuario)
router.get("/adm", getAdm)
router.get("/",atualizarPerfil)
router.post("/login", login)


export default router;