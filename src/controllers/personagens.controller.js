const personagensService = require("../services/personagens.service");
const mongoose = require("mongoose");

const homePersonagemController = (req, res) => {
  res.send("home personagens");
};

const findPersonagensController = async (req, res) => {
  const allPersonagens = await personagensService.findPersonagensService();
  res.send(allPersonagens);
};

const findPersonagemByIdController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: "ID inválido!" });
    return;
  }

  const chosenPersonagem = await personagensService.findPersonagemByIdService(
    idParam
  );

  if (!chosenPersonagem) {
    return res.status(404).send({ message: "Personagem não encontrado!" });
  }

  res.send(chosenPersonagem);
};

const findPersonagemByIdadeController = async (req, res) => {
  const idadeParam = req.params.idade;

  if (!mongoose.Types.ObjectId.isValid(idadeParam)) {
    res.status(400).send({ message: "Idade não encontrada!" });
    return;
  }

  const chosenPersonagem =
    await personagensService.findPersonagemByIdadeController(idadeParam);

  if (!chosenPersonagem) {
    return res.status(404).send({ message: "Personagem não encontrado!" });
  }

  res.send(chosenPersonagem);
};

const addPersonagemController = async (req, res) => {
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
        "Você não preencheu todos os dados para adicionar um novo personagem à lista!",
    });
  }

  const newPersonagem = await personagensService.addPersonagemService(
    personagem
  );

  res.send(newPersonagem);
};

const updatePersonagemController = async (req, res) => {
  const idParam = req.params.id;
  const personagemEdit = req.body;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: "ID inválido!" });
    return;
  }

  const chosenPersonagem = await personagensService.findPersonagemByIdService(
    idParam
  );

  if (!chosenPersonagem) {
    return res.status(404).send({ message: "Personagem não encontrado!" });
  }

  if (
    !personagemEdit ||
    !personagemEdit.nome ||
    !personagemEdit.idade ||
    !personagemEdit.foto ||
    !personagemEdit.resumo
  ) {
    return res.status(400).send({
      message: "Você não preencheu todos os dados para editar o personagem!",
    });
  }

  const updatedPersonagem = await personagensService.updatePersonagemService(
    idParam,
    personagemEdit
  );

  res.send(updatedPersonagem);
};

const deletePersonagemController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: "ID inválido!" });
    return;
  }

  const chosenPersonagem = await personagensService.findPersonagemByIdService(
    idParam
  );

  if (!chosenPersonagem) {
    return res.status(404).send({ message: "Personagem não encontrado!" });
  }

  await personagensService.deletePersonagemService(idParam);

  res.send({ message: "Personagem deletado com sucesso!" });
};

module.exports = {
  homePersonagemController,
  findPersonagensController,
  findPersonagemByIdController,
  findPersonagemByIdadeController,
  addPersonagemController,
  updatePersonagemController,
  deletePersonagemController,
};
