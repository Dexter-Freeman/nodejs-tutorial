const express = require('express');
const toDoController = require('./controllers/toDoController'); 
const port = 3000;


const app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));
// parse json middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// fire controllers
toDoController(app);

// listen port
app.listen(port);

console.log('App listen on ' + port + ' port');