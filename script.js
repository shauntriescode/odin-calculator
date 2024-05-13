// Step 1 - Create Basic Math Operators
function add(num1, num2) {
  return num1 + num2
};

function subtract(num1, num2) {
  return num1 - num2
};

function multiply(num1, num2) {
  return num1 * num2
};

function divide(num1, num2) {
  return num1 / num2
};

function remainder(num1, num2) {
  return num1 % num2
}

// Step 2 - Variables for Operator Function (To update later)
let firstNumber;
let secondNumber;
let operator;

// Step 3 - Create Operator function
function operate() {
  let result
  if(operator === '+') {
    result = add(firstNumber, secondNumber)
  } else if (operator === '-') {
    result = subtract(firstNumber, secondNumber)
  } else if (operator === '*') {
    result = multiply(firstNumber, secondNumber)
  } else if (operator === '/') {
    if(secondNumber === 0) {
      return 'Error'
    } else {
      result = divide(firstNumber, secondNumber)
    }
  } else if (operator === '%') {
    if(secondNumber === 0) {
      return 'Error'
    } else {
      result = remainder(firstNumber, secondNumber)
    }
  }
  return result
}

// Step 5 - Put HTML elements into variables 
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equals');
const display = document.querySelector('.display')
const clear = document.querySelector('.clear')
const posOrNeg = document.querySelector('.pos-neg')

// Step 6 - Add eventListeners to HTML Variables as well as functions to go within the eventListeners

function setFirstNumber() {
  firstNumber = parseFloat(display.textContent)
};

function setSecondNumber() {
  secondNumber = parseFloat(display.textContent)
};

function setCurrentOperator(currentOperator) {
  operator = currentOperator
};

function clearAll() {
  firstNumber = ''
  secondNumber = ''
  operator = ''
  display.textContent = ''
}

function decimalNum() {
  if(!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function roundTwoDecimal(num) {
  return Math.round(num * 100) / 100;
}
// Need to fix - Operations when using negative numbers are not correct
function positiveOrNegative() {
  const currentNumber = parseFloat(display.textContent)
  
  const sign = Math.sign(currentNumber)

  const toggledNumber = sign === 0 ? currentNumber : currentNumber * -1;

  display.textContent = toggledNumber
}


operatorButtons.forEach(button => {
  button.addEventListener('click', () => {

    setCurrentOperator(button.textContent)

    setFirstNumber()

    display.textContent = ''

  })
});

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    display.textContent += button.textContent;

    if (operator !== undefined && operator !== '') {
      setSecondNumber();
    }  
  })
});

equalButton.addEventListener('click', () => {
  const result = operate()

  if (Number.isInteger(result)) {
    display.textContent = result;
  } else {
    display.textContent = roundTwoDecimal(result);
  }
});

clear.addEventListener('click', () => {
  clearAll();
});

decimalButton.addEventListener('click', () => {
  decimalNum();
});

posOrNeg.addEventListener('click', () => {
  positiveOrNegative()
})