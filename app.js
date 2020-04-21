const express = require('express');

// Модуль express возвращает функцию, поэтому нам надо его вызвать
const app = express();

// Пропишем некоторые роуты
app.get('/', (req, res) => {
  res.send('This is the homepage');
});

app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

// Для того чтобы получить доступ к параметрам адресной строки будем использовать
// свойство params у объекта res.param
app.get('/profile/:id', (req, res) => {
  res.send('You request the profile with id of: ' + req.params.id);
});

// Укажем какой порт необходимо слушать приложению (серверу)
app.listen(3000);