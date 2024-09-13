import Usuarios from "../Model/usuarioModel.js";
import conn from "../Config/Conn.js";
import formatZodError from "../helpers/zodError.js";
import { z } from "zod";
import bcrypt from 'bcrypt'
import createToken from '../helpers/zodCreateToken.js'

const createShema = z.object({
  Usuario: z
    .string()
    .min(3, { message: "O usuario deve ter pelo menos 8 caracteres" })
    .transform((txt) => txt.toLocaleLowerCase()),
});

const getShema = z.object({
  papel: z.string({ message: "papel do usuario" }),
});

export const criarUsuario = async (request, response) => {
  const { id, nome, email, senha, papel } = request.body;
  const bodyValidation = createShema.safeParse(request.body);

  if (bodyValidation.success) {
    response.status(404).json({
      message: "Os dados recebidos do corpo da aplicação são inválidos",
      detalhes: bodyValidation.error,
    });
    return;
  }
  const novoUsuario = {
    id,
    nome,
    email,
    senha,
    papel,
  };
  try {
    await Usuarios.create(novoUsuario);
    response.status(201).json({ message: "Usuario Cadastrado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Erro ao cadastrar Usuario" });
  }
};

export const getAdm = async (request, response) => {
  const paramValidator = getShema.safeParse(request.params);
  if (!paramValidator.success) {
    response.status(400).json({
      message: "identidicação está inválido",
      detalhes: formatZodError(paramValidator.error),
    });
    return;
  }
  const { papel } = request.params;
  try {
    const usuarioPapel = await Usuarios.findOne({ where: { papel } });
    if (Usuarios === null) {
      response.status(404).json({ message: "Usuarios não encontrado" });
      return;
    }

    response.status(200).json(usuarioPapel);
  } catch (error) {
    response.status(500).json({ err: "Erro ao buscar tarefa por papel" });
    return;
  }
};

export const atualizarPerfil = async (request, response) => {
  const { id } = request.params;

  try {
    const usuario = await usuario.findOne({ raw: true, where: { id } });
    if (usuario === null) {
      response.status(404).json({ message: "Usuario não encontrada" });
      return;
    }

    if (usuario.status === "pendente") {
      await usuario.update({ status: "concluida" }, { where: { id } });
    } else if (usuario.status === "concluida") {
      await usuario.update({ status: "pendente" }, { where: { id } });
    }

    // novaConsulta
    const usuarioAtualizada = await usuario.findOne({
      raw: true,
      where: { id },
    });
    response.status(200).json(usuarioAtualizada);
    // console.log(tarefa.status);
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Error ao atualizar tarefa" });
  }
};
export const login = (request, response) => {
 
  const { email, senha } = request.body;
  if (!email) {
    response.status(400).json({ err: "O email é obrigatório" });
    return
  }
  if (!senha) {
    response.status(400).json({ err: "A senha é obrigatória" });
    return
  }

  const checkSql = /*sql*/ `SELECT * FROM  usuarios WHERE ?? = ?`;
  const checkData = ["email", email];
   conn.query(checkSql, checkData, /*async */(err, data) => {
    if (err) {    
      console.error(err);
      response.status(500).json({ err: "Erro ao buscar usuario" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ err: "Usuário não encontrado" });
      return;
    }
     
    const usuario = data[0];  
    const compararSenha = /*await */bcrypt.compare(senha, usuario.senha);
     console.log("Senha do usuário", senha)
     console.log("Senha do objeto", usuario.senha)
     console.log("comparar senha", compararSenha)
    if (!compararSenha) {
      return response.status(401).json({ message: "Senha inválida" });
    }

    try {
      /*await*/ createToken(usuario, request, response);
    } catch (error) {
      response.error(error);
      response.status(500).json({ err: "Erro ao processar informações" });
      return
    }
  });
};
