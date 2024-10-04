import { request, response } from "express";
import jwt from "jsonwebtoken"

// asssicrono 
const createUserToken = async(usuario, request, response)=>{
    //const token = jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({
        nome: usuario.nome,  
        id: usuario.id  // id: usuario.usuarios_id
    }, 
    process.env.TOKEN_PASSWORD,
    {
    expiresIn:"12",
    });// senha segura que não consiga criptgrafar e depois descriptografar, usa o hash

    response.status(200).json({
        message:"Você está autenticado", 
        token: token, 
        usuarioId: usuario.id,
    });
}

    export default createUserToken;