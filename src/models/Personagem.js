const mongoose = require("mongoose");

const PersonagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  foto: { type: String, required: true },
  resumo: { type: String, required: true },
});

const Personagem = mongoose.model("personagens", PersonagemSchema);

module.exports = Personagem;
