const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pinul trebuie să aibă un nume'],
  },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
