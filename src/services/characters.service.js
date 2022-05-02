const Character = require('../models/Characters');

const findCharactersService = async () => {
  const characters = await Character.find();
  return characters;
};

const findCharacterByIdService = async (id) => {
  const character = await Character.findById(id);
  return character;
};

const findCharacterByIdadeService = async (valor) => {
  const character = await Character.findByValor(valor);
  return character;
};

const addCharacterService = async (character) => {
  const characterCriado = await Character.create(character);
  return characterCriado;
};

const updateCharacterService = async (id, characterEdited) => {
  const characterAtualizado = await Character.findByIdAndUpdate(
    id,
    characterEdited,
  );
  return characterAtualizado;
};

const deleteCharacterService = async (id) => {
  return await Character.findByIdAndDelete(id);
};

module.exports = {
  findCharactersService,
  findCharacterByIdService,
  findCharacterByIdadeService,
  addCharacterService,
  updateCharacterService,
  deleteCharacterService,
};
