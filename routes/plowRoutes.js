const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const plowController = require('../controllers/plowController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, plowController.getAllPlows)
  .post(plowController.createPlow);
router
  .route('/:id')
  .get(plowController.getPlow)
  .patch(plowController.updatePlow)
  .delete(authController.protect, plowController.deletePlow);

module.exports = router;
