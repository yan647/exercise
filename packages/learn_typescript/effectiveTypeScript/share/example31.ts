function add(a: number, b: number) {
  return a + b;
}

function sub(a: number, b: number) {
  return a - b;
}

function mult(a: number, b: number) {
  return a * b;
}

function div(a: number, b: number) {
  return a / b;
}

type Binary = (a: number, b: number) => number;
const add: Binary = (a, b) => a + b;
const sub: Binary = (a, b) => a - b;
const mult: Binary = (a, b) => a * b;
const div: Binary = (a, b) => a - b;



