const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = 8080;

const router = require('./api/routes/books.routes');
const { handleEndpointNotFound, handle } = require('./api/exception/handler');

app.use(express.json());
app.use(router);
app.use(handleEndpointNotFound);
app.use(handle);

mongoose.connect('mongodb://host.docker.internal:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const BookModel = require('./persistence/book/bookModel');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  BookModel.deleteMany().then(() => {
    BookModel.insertMany([
      { title: 'Harry Potter', isbn: '123-323-5135-1', numberOfPages: '343', authors: [ 'Jarbas José', 'Maria Hub' ], publisher: 'Royals', synopsis: 'Vary good for new readers/magicians.', publishingDate: '2000-01-20' },
      { title: 'Harry Potter 2', isbn: '999-323-5135-1', numberOfPages: '223', authors: [ 'Jarbas José', 'Maria Hub' ], publisher: 'Royals', synopsis: 'Vary good for new readers/magicians.', publishingDate: '2002-01-20' },
      { title: 'Harry Potter 3', isbn: '444-323-5135-1', numberOfPages: '431', authors: [ 'Jarbas José', 'Maria Hub' ], publisher: 'Royals', synopsis: 'Vary good for new readers/magicians.', publishingDate: '2004-01-20' },
      { title: 'Harry Potter 4', isbn: '555-323-5135-1', numberOfPages: '511', authors: [ 'Jarbas José', 'Maria Hub' ], publisher: 'Royals', synopsis: 'Vary good for new readers/magicians.', publishingDate: '2005-01-20' },
      { title: 'Harry Potter 5', isbn: '888-323-5135-1', numberOfPages: '341', authors: [ 'Jarbas José', 'Maria Hub' ], publisher: 'Royals', synopsis: 'Vary good for new readers/magicians.', publishingDate: '2008-01-20' }
    ]).then(() => console.log('Data inserted.'));
  });

  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
});
