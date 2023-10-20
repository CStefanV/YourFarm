const Cultivator = require('../models/cultivatorModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCultivators = catchAsync(async (req, res, next) => {
  const cultivators = await Cultivator.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      cultivators,
    },
  });
});
exports.getCultivator = factory.getOne(Cultivator);
exports.createCultivator = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newCultivator = await Cultivator.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newCultivator,
    },
  });
});
exports.updateCultivator = factory.updateOne(Cultivator);

exports.deleteCultivator = catchAsync(async (req, res, next) => {
  const cultivatorId = req.params.id;
  await Cultivator.findByIdAndDelete(cultivatorId);

  res.status(204).json({
    status: 'success',
  });
});
