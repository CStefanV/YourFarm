const Planter = require('../models/planterModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllPlanters = catchAsync(async (req, res, next) => {
  const planters = await Planter.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      planters,
    },
  });
});
exports.getPlanter = factory.getOne(Planter);
exports.createPlanter = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newPlanter = await Planter.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPlanter,
    },
  });
});
exports.updatePlanter = factory.updateOne(Planter);

exports.deletePlanter = catchAsync(async (req, res, next) => {
  const semanatoareId = req.params.id;
  await Planter.findByIdAndDelete(semanatoareId);

  res.status(204).json({
    status: 'success',
  });
});
