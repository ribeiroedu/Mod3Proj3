const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const charactersController = require('../controllers/characters.controller');

router.get('/', charactersController.homeCharacterController);
router.get('/find-characters', charactersController.findCharactersController);
router.get(
  '/find-character/:id',
  charactersController.findCharacterByIdController,
);
router.get(
  '/find-character-idade/:idade',
  charactersController.findCharacterByIdadeController,
);

router.post('/add', charactersController.addCharacterController);

router.put('/update/:id', charactersController.updateCharacterController);

router.delete('/delete/:id', charactersController.deleteCharacterController);

module.exports = router;
