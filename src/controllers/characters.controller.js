const charactersService = require('../services/characters.service');
const mongoose = require('mongoose');

const homeCharacterController = (req, res) => {
  res.send('home characters');
};

const findCharactersController = async (req, res) => {
  const allCharacters = await charactersService.findCharactersService();
  res.send(allCharacters);
};

const findCharacterByIdController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  res.send(chosenCharacter);
};

const findCharacterByIdadeController = async (req, res) => {
  const idadeParam = req.params.idade;

  if (!mongoose.Types.ObjectId.isValid(idadeParam)) {
    res.status(400).send({ message: 'Idade não encontrada!' });
    return;
  }

  const chosenCharacter =
    await charactersService.findCharacterByIdadeController(idadeParam);

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  res.send(chosenCharacter);
};

const addCharacterController = async (req, res) => {
  const character = req.body;

  if (
    !character ||
    !character.nome ||
    !character.idade ||
    !character.foto ||
    !character.resumo
  ) {
    return res.status(400).send({
      message:
        'Você não preencheu todos os dados para adicionar um novo character à lista!',
    });
  }

  const newCharacter = await charactersService.addCharacterService(character);

  res.send(newCharacter);
};

const updateCharacterController = async (req, res) => {
  const idParam = req.params.id;
  const characterEdit = req.body;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  if (
    !characterEdit ||
    !characterEdit.nome ||
    !characterEdit.idade ||
    !characterEdit.foto ||
    !characterEdit.resumo
  ) {
    return res.status(400).send({
      message: 'Você não preencheu todos os dados para editar o character!',
    });
  }

  const updatedCharacter = await charactersService.updateCharacterService(
    idParam,
    characterEdit,
  );

  res.send(updatedCharacter);
};

const deleteCharacterController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  await charactersService.deleteCharacterService(idParam);

  res.send({ message: 'Character deletado com sucesso!' });
};

module.exports = {
  homeCharacterController,
  findCharactersController,
  findCharacterByIdController,
  findCharacterByIdadeController,
  addCharacterController,
  updateCharacterController,
  deleteCharacterController,
};
