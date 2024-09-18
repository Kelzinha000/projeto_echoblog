import "dotenv/config";
import express, { request, response } from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

//conexão
import conn from "./Config/Conn.js";

import postagemModel from "./Model/postagemModel.js";


import postagemRouter from "./Routes/postagemRouter.js";
import usuarioRouter from "./Routes/usuarioRouter.js";

// blog
const PORT = process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("filename:", __filename);
console.log("dirname: ", __dirname);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//midlware necessário para imagens
// app.use(express.static("public")) muda para:
app.use("/public", express.static(path.join(__dirname, "public")));

// rotas
app.use("/postagem", postagemRouter);
app.use("/usuarios", usuarioRouter);

app.get("/", (request, response) => {
  console.log(request.file);
});

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

conn.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor on http://localhost:${PORT}`);
  });
});
