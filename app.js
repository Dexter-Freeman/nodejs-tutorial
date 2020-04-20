const http = require('http');
const fs = require('fs');

// создадим сервер. Ему обязательно нужно передать коллбек
const server = http.createServer((req, res) => {
  //req это запрос, который пришел на сервер
  // url содержит адрес url к которому былл запрос
  console.log('request was made: ' + req.url);
  // console.log(req);
  
  // res это ответ, который даст сервер
  // res.writeHead(200, {'Content-Type': 'text/html'});
  //writeHead создает заголовки для ответа, первый аргумент это статус-код
  // второй аргумент это объект, который содержит собственно заголовки
  // ответ необходимо завершить
  // res.end('Hello from Dexter!');

  // создадим поток чтения и отправим его в качестве ответа от сервера
  // Serving HTML Pages
  // const myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  // myReadStream.pipe(res);
  // pipe сам завершит ответ

  // Для отправки json данных 
  const myObj = {
    name: 'Dexter',
    age: '34'
  };
  // отравить напрямую обьект илил json нельзя, необходимо их серриализовать
  // res.writeHead(200, {'Content-Type': 'applcation/json'});
  // res.end(JSON.stringify(myObj));

  // обработаем некоторые роунтинги:

  if ( req.url === '/' ) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
  } else if ( req.url === '/api/v01') {
    res.writeHead(200, {'Content-Type': 'applcation/json'});
    res.end(JSON.stringify(myObj));
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
  }
});

// необходимо указать номер порта и ip, который будет слушать сервер
server.listen(3000, '127.0.0.1');

// можно вызывать методы через точку один за другим
// server = http.createServer().listen()

console.log('Server was running');

// ___________________________________________

