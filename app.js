// В NodeJS глобальным объектом является global (в браузере Window)
// для импорта других модулей (функций) используется require
const stuff = require('./stuff'); // Стиль экспорта Common JS
// const {adder, someConst} = require('./stuff');

// При импорте стандартных модулей (встроенных в NodeJS) не нужно указывать пудь до этого модуля
const events = require('events');

console.log('some text');

setTimeout(() => {
    console.log('2 secons have passed');
}, 2000);

// Стандартные методы доступны в NodeJS так же как и в браузере

console.log(__dirname);
console.log(__filename);
// __dirname и __filename глобальные переменные

let arr = ['first', 'second', 'third'];

console.log(stuff.counter(arr));

console.log('someConst ', stuff.someConst);
console.log(stuff.adder(5, 6));

// _______________________

// Events Emitter

let myEmitter = new events.EventEmitter();
// создаем объект, который будет принимать события

// Причем у объекта на одно и то же событие можно запускать разные коллбеки

// First listener
myEmitter.on('event', function firstListener() {
    console.log('Helloooo! first listener');
  });
  // Second listener
  myEmitter.on('event', function secondListener(arg1, arg2) {
    console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
  });
  // Third listener
  myEmitter.on('event', function thirdListener(...args) {
    const parameters = args.join(', ');
    console.log(`event with parameters ${parameters} in third listener`);
  });
  
  console.log(myEmitter.listeners('event'));
  
  myEmitter.emit('event', 1, 2, 3, 4, 5);
  
  // Prints:
  // [
  //   [Function: firstListener],
  //   [Function: secondListener],
  //   [Function: thirdListener]
  // ]
  // Helloooo! first listener
  // event with parameters 1, 2 in second listener
  // event with parameters 1, 2, 3, 4, 5 in third listener


  // Util

  // Util позволяет обьектам наследоваться от других обьектов
  const util = require('util');

  const Person = function(name) {
    this.name = name;
  }

  // сделаем наследование EventEmitter в Person при помощи Util
  util.inherits(Person, events.EventEmitter);

  let person1 = new Person('person1');
  let person2 = new Person('person2');
  let person3 = new Person('person3');

  let persons = [person1, person2, person3];

  persons.forEach(p => p.on('speak', (msg) => console.log(p.name + ' said ' + msg)));
  person1.emit('speak', 'hey you!');

// Однако в синтаксисе ES6 наследование классов делается намного проще
// class Person extends events.EventEmitter

// __________________________________________

// File System

// встроенный модуль fs позволяет работать с файловой системой: читать/записывать файлы/папки
const fs = require('fs');

// прочитаем файл fsRead.txt находящийся в той же директории 
let readMe = fs.readFileSync('fsRead.txt', 'utf8');
console.log(readMe);
// метод readFileSync является "блокирующим", т.е. он не асинхронный, и исполнение скрипта
// не продолжится до завершения работы readFileSync. У него есть и асинхронный аналог
// readFileSync принимает ("путь к файлу", "кодировку файла"), без кодировки он прочитает
// нули и единицы

// создадим новый файл
fs.writeFileSync('fsWrite.txt', readMe);
// файл fsWrite.txt был создан
// writeFileSync также является блокирующим методом

// воспользуемся асинхронными методами для чтения/записи файлов
// асинхронные методы отличаются от синхронных тем, что им необходимо передвать коллбек,
// который будет вызван по завершению работы метода, этот коллбек принимает два параметра - 
// ошибку и данные
fs.readFile('fsRead.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

console.log('readFile don\'t blocking code'); // отработает раньше чем прочитается файл

fs.writeFile('fsWriteAsync.txt', readMe, err => {
  return err ? console.error(err) : null
});

// для удаления файлов - метод unlink
fs.unlink('fsWrite.txt', (err) => err ? console.log(err) : null);

// Для создания директорию синхронно, используем метод mkdirSync('Название директории')
fs.mkdirSync('stuff');
// директория была создана
// чтобы удалить директорию - rmdirSync, это тоже синхронный метод
fs.rmdirSync('stuff');
// директория была удалена

// для того чтобы не блокировать код, нужно использовать асинхронные методы
// не забываем, о том что при использовании асинхронных методов, необходимо в них 
// передавать коллбек

fs.mkdir('stuff', err => {
  if (err) return console.log(err);
  console.log('stuff directory has been created');

  // создадим в этой директории файл
  let readMe = fs.readFileSync('fsRead.txt', 'utf8');
  fs.writeFile('fsWriteAsync.txt', readMe, err => {
    return err ? console.log(err) : console.log('file was writed');

  });
});

// теперь удалим этой файл и директорию
fs.unlink('./stuff/fsWriteAsync.txt', err => {
  // после удаления файла, директория станет пустой
  // При попытке удалить не пустую директорию, будет выброшена ошибка
  console.log('file removed');
  fs.rmdir('stuff', err => err ? console.log(err) : console.log('folder removed'));
  // удалили директорию
});

// __________________________________________

// Readable Streams // Writable Streams


// создадим поток чтения
const myReadStream = fs.createReadStream(__dirname + '/lorem.txt', 'utf8');
// создадим поток записи
const myWriteStream = fs.createWriteStream(__dirname + '/writeMeChunk.txt');

// по мере получения данных, будем выводить их в консоль
myReadStream.on('data', chunk => {
  console.log('new chunk recieved');
  // console.log(chunk);
  // запишем полученные данные в файл
  myWriteStream.write(chunk);
});

fs.unlink('writeMeChunk.txt', err => {});

//_______________________