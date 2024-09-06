import { request, response } from "express";
import Postagens from "../Model/postagemModel.js";

export const criarPostagem = async (request, response) => {
    const { id,titulo, conteudo, autor, dataPublicao, image } = request.body;
  
    const novoPostagem = {
      id,
      titulo,
      conteudo,
      autor,
      dataPublicao,
      image,
    };
    try {
      await Postagens.create(novoPostagem);
      response.status(201).json({ message: "Postagem Postado" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao cadastrar Postagem" });
    }
  };