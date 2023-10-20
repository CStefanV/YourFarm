/* eslint-disable new-cap */
const mongoose = require('mongoose');
const slugify = require('slugify');

const headerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Un heder trebuie să aibă un nume'],
    trim: true,
    maxlength: [
      50,
      'Numele unui heder nu trebuie sa fie mai lung de 50 de caratere',
    ],
    minlength: [
      5,
      'Numele unui heder nu trebuie sa fie mai scurt de 5 de caratere',
    ],
  },
  slug: String,
  compatibleWith: [String],
  workingWidth: Number,
  functioningHours: {
    type: Number,
    required: true,
  },
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

headerSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Header = new mongoose.model('Header', headerSchema);

module.exports = Header;
