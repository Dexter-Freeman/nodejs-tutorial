const express = require('express');
const toDoController = require('./controllers/toDoController'); 
const port = 3000;


const app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));

// fire controllers
toDoController(app);

// listen port
app.listen(port);

console.log('App listen on ' + port + ' port');