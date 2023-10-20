/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const sprayerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Un pulverizator trebuie să aibă un nume'],
    trim: true,
    maxlength: [
      50,
      'Numele unui pulverizator nu poate fi mai lung de 50 de caratere',
    ],
    minlength: [
      5,
      'Numele unui pulverizator nu poate fi mai scurt de 5 de caratere',
    ],
  },
  slug: String,
  tankCapacity: Number,
  workingSpeed: Number,
  spreadingWidth: Number,
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

sprayerSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Sprayer = new mongoose.model('Sprayer', sprayerSchema);

module.exports = Sprayer;
