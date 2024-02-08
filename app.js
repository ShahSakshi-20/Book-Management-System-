const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/booksRoutes');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);

app.use(express.static(path.join(__dirname, 'public'))); 

app.listen(port, () => {
  console.log('App listening on port 3000');
});
