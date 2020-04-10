"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var hellowebpack = function hellowebpack() {
  console.log('Hello World!');
  console.log('Webpack is awesome!!!');
  console.log('Now I can start working on real development projects!');
};

var num = function num() {
  var x = 999;
  return x;
};

var num1 = function num1() {
  return 5555599999;
};

var _default = {
  hellowebpack: hellowebpack,
  num: num,
  num1: num1
};
exports["default"] = _default;
var variable1 = 12345;
var variable2 = 'This is a strong in ES6';
