const Combine = require('../models/combineModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCombines = catchAsync(async (req, res, next) => {
  const combines = await Combine.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      combines,
    },
  });
});
exports.getCombine = factory.getOne(Combine);
exports.createCombine = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newCombine = await Combine.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newCombine,
    },
  });
});

exports.updateCombine = factory.updateOne(Combine);
exports.deleteCombine = catchAsync(async (req, res, next) => {
  const combinaId = req.params.id;
  console.log('Deleting combine:', combinaId);
  await Combine.findByIdAndDelete(combinaId);

  res.status(204).json({
    status: 'success',
  });
});
