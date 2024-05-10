// Step 1 - Create Mathematical Functions
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

// Step 2 - Create Variables for Mathematical Function
let firstNum;
let secondNum;
let operator;

// Step 3 - Create Operate Function
function operate() {

}

// Step 4 - Variables of HTML Elements
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButtons = document.querySelectorAll('.decimal');
const equalButtons = document.querySelectorAll('.equal');

const screen = document.querySelector('.screen')
const clear = document.querySelector('.clear')



// Step 5 - Event Listeners - Using forEach to get each element
numberButtons.forEach(button => {
  button.addEventListener('click', handleNumberButtonClick)
})

operatorButtons.forEach(button => {
  button.addEventListener('click', handleOperatorButtonClick)
})

decimalButtons.forEach(button => {
  button.addEventListener('click', test)
})

equalButtons.forEach(button => {
  button.addEventListener('click', test)
})

// Step 6 - Functions that will occur when clicked
function handleNumberButtonClick(event) {
  const number = event.target.textContent
  screen.textContent += number;
}

function handleOperatorButtonClick(event) {
  const operator = event.target.textContent
  screen.textContent += operator;
}



function test() {
  console.log('Test');
}