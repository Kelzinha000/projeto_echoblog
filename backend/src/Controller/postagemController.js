import { request, response } from "express";
import Postagens from "../Model/postagemModel.js";

export const criarPostagem = async (request, response) => {
  const { id, titulo, conteudo, autor } = request.body;

  const novoPostagem = {
    id,
    titulo,
    conteudo,
    autor,
    imagem,
  };
  try {
    await Postagens.create(novoPostagem);
    response.status(201).json({ message: "Postagem Postado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Erro ao cadastrar Postagem" });
  }
};

export const getTodosPostagens = async (request, response) => {
  const page = paserInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit || 10);
  const offset = (page - 1) * limit;
  try {
    const postagens = await Postagens.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(postagens.count / limit);
    response.status(200).json({
      totalPostagens: postagens.count,
      totalPaginas,
      paginaAtual: page,
      intensPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:3333/tarefas?page=${page + 1}`,
      postagens: postagens.rows,
    });
  } catch (error) {
    response.status(500).json({ message: "erro ao buscar postagens" });
  }
};
export const buscarPostagemPorId = async (request, response) => {
  const { id } = request.params;

  try {
    const PostagemId = await Postagens.findOne({ where: { id } });
    if (Postagens === null) {
      response.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    response.status(200).json(PostagemId);
  } catch (error) {
    response.status(500).json({ err: "Erro ao buscar postagem por id" });
    return;
  }
};
