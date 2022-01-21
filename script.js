'use strict';

let reader = new FileReader();
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    console.log(reader.result);
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}
const exp = document.getElementById('exp');
const calcButton = document.getElementById('calc');
const calcResult = document.getElementById('result');

calcButton.addEventListener('click', calcFunc);

//Verifying mathematical actions

const mathActions = {
  multiplication: {
    value: '*',
    func: (a, b) => parseInt(a) * parseInt(b),
  },
  division: {
    value: '/',
    func: (a, b) => parseInt(a) / parseInt(b),
  },
  addition: {
    value: '+',
    func: (a, b) => parseInt(a) + parseInt(b),
  },
  substraction: {
    value: '-',
    func: (a, b) => parseInt(a) - parseInt(b),
  },
};

//Looking for math operators

function calcExpr(str) {
  let res;
  Object.keys(mathActions).map(function (type) {
    res = parseExpr(str, mathActions[type]);
    if (res) {
      str = str.replace(res.str, res.value.toString());
      str = calcExpr(str);
    }
  });
  return str;
}

// Looking for brackets

function parseBrackets(str) {
  const out = str.match(/\((.*)\)/);
  if (out) {
    const expResult = parseBrackets(out[1]);
    str = str.replace(out[0], expResult);
    return calcExpr(str);
  } else {
    return calcExpr(str);
  }
}

// Parsing part

function parseExpr(str, action) {
  const reg = new RegExp(`((\\d+)\\s*\\${action.value}\\s*(\\d+))`);
  const out = str.match(reg);
  if (!out) return false;

  const result = {
    str: out[1],
  };

  result.value = action.func(out[2], out[3]);
  return result;
}

//Showing the result and making "Calculate" button to work

function calcFunc() {
  const result = parseBrackets(exp.value);
  calcResult.innerHTML = result;
  console.log(result);
}
