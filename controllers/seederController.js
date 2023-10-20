const Seeder = require('../models/seederModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllSeeders = catchAsync(async (req, res, next) => {
  const seeders = await Seeder.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      seeders,
    },
  });
});
exports.getSeeder = factory.getOne(Seeder);
exports.createSeeder = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newSeeder = await Seeder.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newSeeder,
    },
  });
});
exports.updateSeeder = factory.updateOne(Seeder);

exports.deleteSeeder = catchAsync(async (req, res, next) => {
  const semanatoareId = req.params.id;
  await Seeder.findByIdAndDelete(semanatoareId);

  res.status(204).json({
    status: 'success',
  });
});
