module.exports = {
  create(bookModel = {}) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: bookModel._id,
      title: bookModel.title,
      isbn: bookModel.isbn,
      numberOfPages: bookModel.numberOfPages,
      authors: bookModel.authors,
      publisher: bookModel.publisher,
      synopsis: bookModel.synopsis,
      publishingDate: bookModel.publishingDate,
    };
  },
};
