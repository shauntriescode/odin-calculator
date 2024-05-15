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

// Step 2 - Variables for Operator Function
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
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

// Step 6 - Add eventListeners to HTML Variables as well as functions to go within the eventListeners

function setFirstNumber() {
  if (firstNumber === undefined) {  // Ensure firstNumber is set only if it is undefined
    const displayValue = display.textContent;
    if (displayValue.includes('-')) {
      firstNumber = -parseFloat(display.textContent);
    } else {
      firstNumber = parseFloat(display.textContent);
    }
  }
}

function setSecondNumber() {
  const displayValue = display.textContent;
  if (displayValue.includes('-')) {
    secondNumber = -parseFloat(display.textContent);
  } else {
    secondNumber = parseFloat(display.textContent);
  }
}

function setCurrentOperator(currentOperator) {
  operator = currentOperator
};

function clearAll() {
  firstNumber = ''
  secondNumber = ''
  operator = ''
  display.textContent = ''
}

function deleteCharacter() {
  const displayValue = display.textContent
  updatedDisplayValue = displayValue.substring(0, displayValue.length - 1);
  return updatedDisplayValue;
}

function decimalNum() {
  if(!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function roundTwoDecimal(num) {
  return Math.round(num * 100) / 100;
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

backspace.addEventListener('click', () => {
  display.textContent = deleteCharacter()

  if(operator !== undefined && operator !== '') {
    setSecondNumber()
  } else {
    setFirstNumber()
  }
  console.log(firstNumber, secondNumber);
})

decimalButton.addEventListener('click', () => {
  decimalNum();
});

// Step 8 Keyboard Support

document.addEventListener('keydown', (e) => {
  const key = e.key;

  console.log("Before Setting:", firstNumber, secondNumber);

  // Numbers
  if (!isNaN(key) || key === '.') {
    display.textContent += key;
    if (!operator || operator === '') {
      firstNumber = parseFloat(display.textContent)
    } else {
      setSecondNumber()
    }
  }


  // Operators
  if (['+', '-', '*', '/', '%'].includes(key)) {
    setCurrentOperator(key);
    setFirstNumber();
    display.textContent = '';
    console.log("After Setting:", firstNumber, secondNumber);
  }

  // Equals
  if (key === 'Enter') {
    const result = operate(firstNumber, secondNumber);
    if (Number.isInteger(result)) {
      display.textContent = result;
    } else {
      display.textContent = roundTwoDecimal(result);
    }
  }

  // Clear
  if (key === 'Escape') {
    clearAll();
    operate = ''
  }

  // Backspace
  if (key === 'Backspace') {
    display.textContent = deleteCharacter();
    if (operator !== undefined && operator !== '') {
      setSecondNumber();
    } else {
      setFirstNumber();
    }
  }
});