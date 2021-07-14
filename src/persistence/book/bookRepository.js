/* eslint-disable radix */
const mongoose = require('mongoose');
const BookModel = require('./bookModel');

module.exports = {
  async find(req) {
    return BookModel.find().sort({ _id: 1 }).exec();
  },
  async findById(id) {
    return BookModel.findById(id).catch((err) => (err instanceof mongoose.Error.CastError ? '' : err));
  },
};
