const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const seederController = require('../controllers/seederController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, seederController.getAllSeeders)
  .post(seederController.createSeeder);
router
  .route('/:id')
  .get(seederController.getSeeder)
  .patch(seederController.updateSeeder)
  .delete(authController.protect, seederController.deleteSeeder);

module.exports = router;
