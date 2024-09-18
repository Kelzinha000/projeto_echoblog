import { DataTypes } from "sequelize";
import conn from "../Config/Conn.js";

import Usuarios from "./usuarioModel.js";

const Postagem = conn.define("Postagens", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  imagem: {
    type: DataTypes.BLOB,
    allowNull: false,
    required: true,
  },
});

Usuarios.hasMany(Postagem)
Postagem.belongsTo(Usuarios)

export default Postagem;
