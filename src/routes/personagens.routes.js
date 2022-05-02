const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const personagensController = require('../controllers/personagens.controller');

router.get('/', personagensController.homePersonagemController);
router.get(
  '/find-personagens',
  personagensController.findPersonagensController,
);
router.get(
  '/find-personagem/:id',
  personagensController.findPersonagemByIdController,
);
router.get(
  '/find-personagem-idade/:idade',
  personagensController.findPersonagemByIdadeController,
);

router.post('/add', personagensController.addPersonagemController);

router.put('/update/:id', personagensController.updatePersonagemController);

router.delete('/delete/:id', personagensController.deletePersonagemController);

module.exports = router;
