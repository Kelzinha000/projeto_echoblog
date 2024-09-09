import 'dotenv/config'
import express,{  request, response } from "express";
import cors from 'cors'

import conn from './Config/Conn.js';

import postagemModel from './Model/postagemModel.js'

import postagemRouter from './Routes/postagemRouter.js'
import usuarioRouter from './Routes/usuarioRouter.js'

// blog
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

conn.sync().then(()=>{
    app.listen(PORT, () =>{
        console.log(`Servidor on http://localhost:${PORT}`)
    })
})

app.use("/",postagemRouter )
app.use("/usuarios", usuarioRouter)

app.use((request, response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})