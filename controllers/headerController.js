const Header = require('../models/headerModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllHeaders = catchAsync(async (req, res, next) => {
  const headers = await Header.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      headers,
    },
  });
});
exports.getHeader = factory.getOne(Header);
exports.createHeader = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newHeader = await Header.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newHeader,
    },
  });
});
exports.updateHeader = factory.updateOne(Header);

exports.deleteHeder = catchAsync(async (req, res, next) => {
  const hederId = req.params.id;
  await Header.findByIdAndDelete(hederId);

  res.status(204).json({
    status: 'success',
  });
});
