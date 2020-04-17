// В NodeJS глобальным объектом является global (в браузере Window)
// для импорта других модулей (функций) используется require
const stuff = require('./stuff'); // Стиль экспорта Common JS
// const {adder, someConst} = require('./stuff');

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