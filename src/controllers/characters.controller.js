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
  const personagem = req.body;

  if (
    !personagem ||
    !personagem.nome ||
    !personagem.idade ||
    !personagem.foto ||
    !personagem.resumo
  ) {
    return res.status(400).send({
      message:
        'Você não preencheu todos os dados para adicionar um novo personagem à lista!',
    });
  }

  const newCharacter = await charactersService.addCharacterService(personagem);

  res.send(newCharacter);
};

const updateCharacterController = async (req, res) => {
  const idParam = req.params.id;
  const personagemEdit = req.body;

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
    !personagemEdit ||
    !personagemEdit.nome ||
    !personagemEdit.idade ||
    !personagemEdit.foto ||
    !personagemEdit.resumo
  ) {
    return res.status(400).send({
      message: 'Você não preencheu todos os dados para editar o personagem!',
    });
  }

  const updatedCharacter = await charactersService.updateCharacterService(
    idParam,
    personagemEdit,
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
