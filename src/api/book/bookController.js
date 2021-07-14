/* eslint-disable no-underscore-dangle */
const responseBookDto = require('./responseBookDto');
const responseBookInArrayDto = require('./responseBookInArrayDto');
const bookRepository = require('../../persistence/book/bookRepository');
const { ResourceNotFoundException } = require('../exception/exceptions');
const { resourceNotFound } = require('../exception/messages/errorDetailMessages');

async function fetchById(id, next) {
  const foundBook = await bookRepository.findById(id);
  if (foundBook) {
    return foundBook;
  }
  return next(new ResourceNotFoundException(resourceNotFound('book', id)));
}

module.exports = {
  async find(req, res, next) {
    try {
      const foundBooks = await bookRepository.find(req);
      res.status(200).json(responseBookInArrayDto.create(foundBooks));
    } catch (e) {
      next(e);
    }
  },
  async findById(req, res, next) {
    try {
      const foundBook = await fetchById(req.params.id, next);
      if (foundBook) {
        res.status(200).json(responseBookDto.create(foundBook));
      }
    } catch (e) {
      next(e);
    }
  },
};
