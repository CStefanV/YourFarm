const Sprayer = require('../models/sprayerModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllSprayers = catchAsync(async (req, res, next) => {
  const sprayers = await Sprayer.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      sprayers,
    },
  });
});
exports.getSprayer = factory.getOne(Sprayer);
exports.createSprayer = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newSprayer = await Sprayer.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newSprayer,
    },
  });
});
exports.updateSprayer = factory.updateOne(Sprayer);

exports.deleteSprayer = catchAsync(async (req, res, next) => {
  const pulverizatorId = req.params.id;
  await Sprayer.findByIdAndDelete(pulverizatorId);

  res.status(204).json({
    status: 'success',
  });
});
