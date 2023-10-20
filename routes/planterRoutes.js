const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const planterController = require('./../controllers/planterController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, planterController.getAllPlanters)
  .post(planterController.createPlanter);
router
  .route('/:id')
  .get(planterController.getPlanter)
  .patch(planterController.updatePlanter)
  .delete(authController.protect, planterController.deletePlanter);

module.exports = router;
