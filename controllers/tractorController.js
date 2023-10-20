/* eslint-disable arrow-body-style */
/* eslint-disable import/no-useless-path-segments */
const Tractor = require('./../models/tractorModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.aliasTopTractors = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-power,functioningHours';
//   req.query.fields = 'name,functioningHours,power,usedAt';
//   next();
// };

exports.getAllTractors = catchAsync(async (req, res, next) => {
  const tractors = await Tractor.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      tractors,
    },
  });
});

exports.getTractor = factory.getOne(Tractor);

exports.createTractor = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;

  const newTractor = await Tractor.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newTractor,
    },
  });
});

exports.updateTractor = factory.updateOne(Tractor);

exports.deleteTractor = catchAsync(async (req, res, next) => {
  const tractorId = req.params.id;
  // console.log('Deleting tractor:', tractorId);
  await Tractor.findByIdAndDelete(tractorId);

  res.status(204).json({
    status: 'success',
  });
});

exports.updateTractorBySlug = catchAsync(async (req, res, next) => {
  try {
    const tractor = await Tractor.findOne({ slug: req.params.slug });

    if (!tractor) {
      console.log('Tractor not found.');
      return next(new AppError('Nu exista vreun tractor cu acest ID', 404));
    }

    // Update tractor data here based on the request body
    tractor.name = req.body.name;
    tractor.power = req.body.power;
    tractor.functioningHours = req.body.functioningHours;
    tractor.timeSpentInTheFarm = req.body.timeSpentInTheFarm;
    tractor.usedAt = req.body.usedAt;
    tractor.maxSpeed = req.body.maxSpeed;
    tractor.category = req.body.category;
    tractor.maxRPM = req.body.maxRPM;
    tractor.rented = req.body.rented;
    tractor.description = req.body.description;

    await tractor.save();

    res.redirect(`/actualizareTractor/${tractor.slug}`);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

//
//
// exports.getTractorStats = catchAsync(async (req, res, next) => {
//   const stats = await Tractor.aggregate([
//     {
//       $match: { power: { $lte: 600 } },
//     },
//     {
//       $group: {
//         _id: '$usedAt',
//         numTractor: {
//           $sum: 1,
//         } /*la fiecare tractor(element) va adauga 1 la suma */,
//         avgPower: { $avg: '$power' },
//         avgFunctioningHours: { $avg: '$functioningHours' },
//         minPower: { $min: '$power' },
//         maxPower: { $max: '$power' },
//       },
//     },
//     {
//       $sort: { avgPower: 1 },
//     },
//     // {
//     //   $match: { _id: { $ne: 'spraying' } },
//     // },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// });
