const http = require('http');

// создадим сервер. Ему обязательно нужно передать коллбек
const server = http.createServer((req, res) => {
  //req это запрос, который пришел на сервер
  // url содержит адрес url к которому былл запрос
  console.log('request was made: ' + req.url);
  // console.log(req);
  
  // res это ответ, который даст сервер
  res.writeHead(200, {'Content-Type': 'text/plain'});
  //writeHead создает заголовки для ответа, первый аргумент это статус-код
  // второй аргумент это объект, который содержит собственно заголовки
  // ответ необходимо завершить
  res.end('Hello from Dexter!');
});

// необходимо указать номер порта и ip, который будет слушать сервер
server.listen(3000, '127.0.0.1');

// можно вызывать методы через точку один за другим
// server = http.createServer().listen()

console.log('Server was running');