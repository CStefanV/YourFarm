const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const headerController = require('./../controllers/headerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, headerController.getAllHeaders)
  .post(headerController.createHeader);
router
  .route('/:id')
  .get(headerController.getHeader)
  .patch(headerController.updateHeader)
  .delete(authController.protect, headerController.deleteHeder);

module.exports = router;
