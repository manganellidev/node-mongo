const responseBookDto = require('./responseBookDto');

module.exports = {
  create(booksModel = []) {
    return booksModel.map((bookModel) => responseBookDto.create(bookModel));
  },
};
