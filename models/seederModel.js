/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const seederSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'O semănătoare trebuie să aibă un nume'],
    trim: true,
    maxlength: [
      50,
      'Numele unei semănători nu poate fi mai lung de 50 de caratere',
    ],
    minlength: [
      5,
      'Numele unei semănători nu poate fi mai scurt de 5 de caratere',
    ],
  },
  slug: String,
  workingSpeed: Number,
  workingSurface: Number,
  functioningHours: Number,
  timeSpentInTheFarm: Number,
  requiredTractorPower: Number,
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

seederSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Seeder = new mongoose.model('Seeder', seederSchema);

module.exports = Seeder;
