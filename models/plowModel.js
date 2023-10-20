/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const plowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Un plug trebuie să aibă un nume'],
    trim: true,
    maxlength: [50, 'Numele unui plug nu poate fi mai lung de 50 de caratere'],
    minlength: [5, 'Numele unui plug nu poate fi mai scurt de 5 de caratere'],
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

plowSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Plow = new mongoose.model('Plow', plowSchema);

module.exports = Plow;
