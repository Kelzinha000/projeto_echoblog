import { Router } from "express";
import {criarUsuario} from "../Controller/usuarioController.js"
const router = Router()

router.post("/registro", criarUsuario)


export default router;