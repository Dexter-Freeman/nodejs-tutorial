const counter = function(arr) {
    return `There are ${arr.length} items in this array`;
};

const someConst = 3.1415;

const adder = function(a, b) {
    return a + b;
};

// module.exports.counter = counter;
// module.exports.someConst = someConst;
module.exports = {counter, someConst, adder};
// в NodeJS экспортировать можно несколькими способами
// module.exports = {counter}