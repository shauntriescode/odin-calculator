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
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
  display.textContent = ''
}

function deleteCharacter() {
  const displayValue = display.textContent;
  const updatedDisplayValue = displayValue.substring(0, displayValue.length - 1);
  display.textContent = updatedDisplayValue;
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
  if (firstNumber !== undefined && secondNumber !== undefined && operator !== undefined) {
    const result = operate();
    if (Number.isInteger(result)) {
      display.textContent = result;
    } else {
      display.textContent = roundTwoDecimal(result);
    }
    // Reset after calculation
    firstNumber = result;
    secondNumber = undefined;
    operator = undefined;
  }
});


clear.addEventListener('click', () => {
  clearAll()
});

backspace.addEventListener('click', () => {
  const updatedDisplay = deleteCharacter();
  if (operator !== undefined && operator !== '') {
    if (updatedDisplay === '') {
      secondNumber = undefined;
    } else {
      setSecondNumber();
    }
  } else {
    if (updatedDisplay === '') {
      firstNumber = undefined;
    } else {
      firstNumber = parseFloat(updatedDisplay);
    }
  }
  console.log(firstNumber, secondNumber, operator);
});

// Step 8 Keyboard Support - Fix escape key crashing operations

document.addEventListener('keydown', (e) => {
  const key = e.key;

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
  }

 // Equals
if (key === 'Enter') {
  if (firstNumber !== undefined && secondNumber !== undefined && operator !== undefined) {
    const result = operate();
    if (Number.isInteger(result)) {
      display.textContent = result;
    } else {
      display.textContent = roundTwoDecimal(result);
    }
    // Reset after calculation
    firstNumber = result;
    secondNumber = undefined;
    operator = undefined;
  }
}


  // Clear
  if (key === 'Escape') {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    display.textContent = '';
    console.log(firstNumber, secondNumber, operator);
  }

  // Backspace
  if (key === 'Backspace') {
    const updatedDisplay = deleteCharacter();
    if (operator !== undefined && operator !== '') {
      if (updatedDisplay === '') {
        secondNumber = undefined;
      } else {
        setSecondNumber();
      }
    } else {
      if (updatedDisplay === '') {
        firstNumber = undefined;
      } else {
        firstNumber = parseFloat(updatedDisplay);
      }
    }
    console.log(firstNumber, secondNumber, operator);
  };
});