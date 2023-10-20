/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const combineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'O combină trebuie să aibă un nume'],
    trim: true,
    maxlength: [
      50,
      'Numele unei combine nu trebuie sa fie mai lung de 50 de caratere',
    ],
    minlength: [
      5,
      'Numele unei combine nu trebuie sa fie mai scurt de 5 caractere',
    ],
  },
  slug: String,
  power: {
    type: Number,
    required: true,
    min: [50, 'Minimum 50 de cai putere'],
    max: [1400, 'Maximum 1400 de cai putere'],
  },
  tank: Number,
  functioningHours: {
    type: Number,
    required: true,
  },
  maxRPM: Number,
  timeSpentInTheFarm: Number,
  maxSpeed: Number,
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

combineSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Combina = new mongoose.model('Combina', combineSchema);

module.exports = Combina;
