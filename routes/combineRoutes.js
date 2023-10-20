const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const combineController = require('./../controllers/combineController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, combineController.getAllCombines)
  .post(combineController.createCombine);
router
  .route('/:id')
  .get(combineController.getCombine)
  .patch(combineController.updateCombine)
  .delete(authController.protect, combineController.deleteCombine);

module.exports = router;
