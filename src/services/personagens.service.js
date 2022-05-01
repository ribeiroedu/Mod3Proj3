const Personagem = require("../models/Personagem");

const findPersonagensService = async () => {
  const personagens = await Personagem.find();
  return personagens;
};

const findPersonagemByIdService = async (id) => {
  const personagem = await Personagem.findById(id);
  return personagem;
};

const findPersonagemByIdadeService = async (valor) => {
  const personagem = await Personagem.findByValor(valor);
  return personagem;
};

const addPersonagemService = async (personagem) => {
  const personagemCriado = await Personagem.create(personagem);
  return personagemCriado;
};

const updatePersonagemService = async (id, personagemEdited) => {
  const personagemAtualizado = await Personagem.findByIdAndUpdate(
    id,
    personagemEdited
  );
  return personagemAtualizado;
};

const deletePersonagemService = async (id) => {
  return await Personagem.findByIdAndDelete(id);
};

module.exports = {
  findPersonagensService,
  findPersonagemByIdService,
  findPersonagemByIdadeService,
  addPersonagemService,
  updatePersonagemService,
  deletePersonagemService,
};
