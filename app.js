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