import Usuarios from "../Model/usuarioModel.js";
import conn from "../Config/Conn.js";
import zodError from "../helpers/zodError.js";

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

