/* eslint-disable prefer-arrow-callback */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const cultivatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Un cultivator trebuie să aibă un nume'],
    trim: true,
    maxlength: [
      50,
      'Numele unui cultivator nu trebuie sa fie mai lung de 50 de caratere',
    ],
    minlength: [
      5,
      'Numele unui cultivator nu trebuie sa fie mai scurt de 5 de caratere',
    ],
  },
  slug: String,
  requiredTractorPower: Number,
  workingSpeed: Number,
  workingWidth: Number,
  functioningHours: Number,
  timeSpentInTheFarm: Number,
  rented: {
    type: String,
    required: false,
    enum: {
      values: ['Inchiriat', 'Cumparat', 'inchiriat', 'cumparat'],
      message: `Această opțiune nu există`,
    },
  },
  description: String,
});

cultivatorSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Cultivator = new mongoose.model('Cultivator', cultivatorSchema);

module.exports = Cultivator;
