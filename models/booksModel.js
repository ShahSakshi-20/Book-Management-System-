const config = require('../config/config.js');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the database');
});

exports.createBook = (book, callback) => {
    db.query(
      `INSERT INTO books (title,  author, genre, publication_year) VALUES ('${book.title}', '${book.author}', '${book.genre}','${book.publication_year}')`,
      callback
    );
  };
  
  exports.getAllBooks = (callback) => {
    db.query('SELECT * FROM books', callback);
  };
  
  exports.getBookById = (bookId, callback) => {
    db.query('SELECT * FROM books WHERE id = ?', bookId, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result[0]);
    });
  };
  
  exports.updateBook = (bookId, updatedBook, callback) => {
    db.query('UPDATE books SET ? WHERE id = ?', [updatedBook, bookId], callback);
  };
  
  exports.deleteBook = (bookId, callback) => {
    db.query('DELETE FROM books WHERE id = ?', bookId, callback);
  };