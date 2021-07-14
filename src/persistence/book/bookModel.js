const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String },
  isbn: { type: String },
  numberOfPages: { type: Number },
  authors: { type: Array },
  publisher: { type: String },
  synopsis: { type: String },
  publishingDate: { type: Date },
});

module.exports = mongoose.model('Book', bookSchema);
