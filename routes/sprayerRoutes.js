const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const sprayerController = require('../controllers/sprayerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, sprayerController.getAllSprayers)
  .post(sprayerController.createSprayer);
router
  .route('/:id')
  .get(sprayerController.getSprayer)
  .patch(sprayerController.updateSprayer)
  .delete(authController.protect, sprayerController.deleteSprayer);

module.exports = router;
