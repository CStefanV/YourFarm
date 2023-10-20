const Plow = require('../models/plowModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllPlows = catchAsync(async (req, res, next) => {
  const plows = await Plow.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      plows,
    },
  });
});
exports.getPlow = factory.getOne(Plow);
exports.createPlow = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newPlow = await Plow.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPlow,
    },
  });
});
exports.updatePlow = factory.updateOne(Plow);

exports.deletePlow = catchAsync(async (req, res, next) => {
  const plugId = req.params.id;
  await Plow.findByIdAndDelete(plugId);

  res.status(204).json({
    status: 'success',
  });
});
