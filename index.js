require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo")

const express = require("express");

const handlebars = require("express-handlebars")

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })

);
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/usuarios/novo", async (req, res) => {
  const nickname = req.body.nickname;
  const nome = req.body.nome;

  const dadosUsuario = {
    nickname,
    nome,
  };


  const usuario = await Usuario.create(dadosUsuario);

  res.send("Usuário inserido sob o id" + usuario.id)
});

app.listen(8000, () => {
  console.log("Server rodando na porta 8000!");
});

app.post("/jogos/novo", async (req, res) => {

  const id = req.body.id;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const precoBase = req.body.precoBase;

  const dadosJogo = {
    id,
    titulo,
    descricao,
    precoBase,
  };

  const jogo = await Jogo.create(dadosJogo);

  res.send("Usuário inserido sob o id" + jogo.id)
});

app.listen(8000, () => {
  console.log("Server rodando na porta 8000!");
});


conn
  .sync()
  .then(() => {
    console.log("Banco de Dados conectado e estrutura sicronizada!");
  })
  
  .catch(() => {
    console.log("Erro ao concetar/sincronizar o banco de dados:" + err);
  });