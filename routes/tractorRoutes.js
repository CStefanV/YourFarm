const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const tractorController = require('./../controllers/tractorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, tractorController.getAllTractors)
  .post(tractorController.createTractor);
router
  .route('/:id')
  .get(tractorController.getTractor)
  .patch(tractorController.updateTractor)
  .delete(tractorController.deleteTractor);

router.patch(
  '/actualizareTractor/:slug',
  tractorController.updateTractorBySlug
);
module.exports = router;
