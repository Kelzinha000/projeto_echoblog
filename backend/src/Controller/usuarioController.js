import Usuarios from "../Model/usuarioModel.js";
import conn from "../Config/Conn.js";
import formatZodError from "../helpers/zodError.js";
import { z } from "zod";

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
