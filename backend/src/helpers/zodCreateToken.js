import jwt from "jsonwebtoken"

// asssicrono 
const createUserToken = async (usuario ,request , response) => {
    //Criar o token        // sign é uma função responsável para criar o token
    const token = jwt.sign(
        {
            nome: usuario.nome, 
            id: usuario.usuario_id
        }, 
        "SENHASUPERSEGURAE" // senha para criptografia
    )
    //Retornar o Token
    response.status(200).json({
        message:"Você está logado",
        token: token,
        usuarioId : usuario.usuario_id
    })
}

    export default createUserToken;