import 'dotenv/config'
import express,{  request, response } from "express";
import cors from 'cors'

import conn from "./Confing/conn.js";

import postagemModel from './Models/postagemModel.js'

import postagemRouter from './Routes/postagemRoutes.js'

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

app.use((request, response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})