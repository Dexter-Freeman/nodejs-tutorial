const express = require('express');
const bodyParser = require('body-parser');

// Модуль express возвращает функцию, поэтому нам надо его вызвать
const app = express();

// Добавим шаблонизатор EJS, можно использовать любой другой шаблонизатор
// Создадим папку views в корневой директории приложения
// в ней создадим темплейты
app.set('view engine', 'ejs');

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// подключим static middleware
app.use('/assets', express.static('assets'));
// express.static мидлварь для статических файлов

// Вообще мидлвари в express подразумевают передачу трех параметров в коллбек
// app.use('/assets/', (req, res, next) {
//   // здесь вызов next означает что работа мидлвари была завершена и передать управление дальше
//   console.log(req.url);
//   next();
// });

// Пропишем некоторые роуты
app.get('/', (req, res) => {
  // Для отправки файла
  // res.sendFile(__dirname + '/index.html');
  // Для рендеринга шаблона
  res.render('index');
});

app.get('/contact', (req, res) => {
  // res.send('This is the contact page');
  // для доступа к строке запроса (query string), используем свойство query обьекта request
  console.log(req.query);
  res.render('contact', { qs: req.query });
});

app.post('/contact', urlencodedParser, (req, res) => {
  // bodyParser дает нам доступ к req.body
  console.log(req.body);
  res.render('contact-sucsess', { data: req.body });
});

// Для того чтобы получить доступ к параметрам адресной строки будем использовать
// свойство params у объекта res.param
// app.get('/profile/:id', (req, res) => {
//   res.send('You request the profile with id of: ' + req.params.id);
// });

app.get('/profile/:name', (req, res) => {
  // здесь мы можем например сделать запрос к базе данных
  // и из полученных данных сгенерировать страницу
  // или передать любые другие данные
  const data = {age: 34, job: 'jedi', hobbies: ['walking', 'reading', 'eating']}
  res.render('profile', { person: req.params.name, data } );
});

// Укажем какой порт необходимо слушать приложению (серверу)
app.listen(3000);