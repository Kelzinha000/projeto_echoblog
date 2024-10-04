import Usuarios from "../Model/usuarioModel.js";
import conn from "../Config/Conn.js";
import formatZodError from "../helpers/zodError.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import createUserToken from "../helpers/createUserToken.js";

const createShema = z.object({
  nome: z
    .string()
    .min(3, { message: "O usuario deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  senha: z
    .string()
    .min(3, { message: "O usuario deve ter pelo menos 8 caracteres" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  senha: z
    .string()
    .min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
});

// const getShema = z.object({
//   papel: z.string({ message: "papel do usuario" }),
// });

export const criarUsuario = async (request, response) => {
  const bodyValidation = createShema.safeParse(request.body); // vai receber do corpo esas informações
  if (!bodyValidation.success) {
    response.status(400).json({
      error: formatZodError(bodyValidation.error),
    });
    return;
  }

  const { nome, email, senha } = request.body;
  const papel = request.body.papel || "leitor";

  const salt = bcrypt.genSaltSync(12);
  const senhaCrypt = bcrypt.hashSync(senha, salt);
  // não armazena senha no banco de dados
  const novoUsuario = {
    nome,
    email,
    senha: senhaCrypt,
    papel,
  };
  try {
    // 1° verificar se existe um email
    const verificaEmail = await Usuarios.findOne({ where: { email } });
    if (verificaEmail) {
      return response.status(401).json({ err: "E-mail está em uso!" });
    }
    //2° Cadastrar UsuárioD
    await Usuarios.create(novoUsuario);
    const selectNovoUsuario = await Usuarios.findOne({where: {email},
    raw:true })

    await createUserToken(selectNovoUsuario, request, response)
    //response.status(201).json({ message: "Usuario Cadastrado" });
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

export const login = async (request, response) => {
  const loginValidation = loginSchema.safeParse(request.body);
  if (!loginValidation.success) {
    return response
      .status(400)
      .json({ detalhes: formatZodError(loginValidation.error) });
  }

  const { email, senha } = loginValidation.data;

  //1° verificar se o email existe no banco

  try {
    const usuario = await Usuarios.findOne({ where:{ email }});
    if (!usuario) {
      response.status(404).json({ err: "Usuário não encontrado"});
      return;
    } // compara senha -> retorna 2 valores, true ou false
    const comparaSenha = await bcrypt.compare(senha, usuario.senha);
    if (!comparaSenha) {
      response.status(401).json({ err: "Senha incorreta" });
      return;
    }

    await createUserToken(usuario, request, response);
    response.status(200).json(Usuarios)
  } catch (error) {
    console.error(error); 
    response.status(500).json(console.error())
  }
};
