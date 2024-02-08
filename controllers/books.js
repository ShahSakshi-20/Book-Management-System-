const db = require('../models/booksModel');

exports.createBook = (req, res) => {
  const book = req.body;

  db.createBook(book, (err) => {
    if (err) {
      console.error('Error creating book', err);
      res.status(500).json({ message: 'Error creating book' });
      return;
    }
    res.status(201).json({ message: 'Book created successfully' });
  });
};


exports.getAllBooks = (req, res) => {
  db.getAllBooks((err, books) => {
    if (err) {
      console.error('Error getting books', err);
      res.status(500).send('Error getting books');
      return;
    }
    res.send(books);
  });
};

exports.getBookById = (req, res) => {
  const bookId = req.params.id;

  db.getBookById(bookId, (err, book) => {
    if (err) {
      console.error('Error getting book', err);
      res.status(500).send('Error getting book');
      return;
    }
    if (!book) {
      res.status(404).send('book not found');
      return;
    }
    res.send(book);
  });
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  db.updateBook(bookId, updatedBook, (err, result) => {
    if (err) {
      console.error('Error updating book', err);
      res.status(500).json({ message: 'Error updating book' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book updated successfully' });
  });
};


exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  db.deleteBook(bookId, (err, result) => {
    if (err) {
      console.error('Error deleting book', err);
      res.status(500).json({ message: 'Error deleting book' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  });
};
