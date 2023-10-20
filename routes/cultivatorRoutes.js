const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const cultivatorController = require('./../controllers/cultivatorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, cultivatorController.getAllCultivators)
  .post(cultivatorController.createCultivator);
router
  .route('/:id')
  .get(cultivatorController.getCultivator)
  .patch(cultivatorController.updateCultivator)
  .delete(authController.protect, cultivatorController.deleteCultivator);

module.exports = router;
