const buttonSum = document.querySelector("#buttonSum");
const buttonDif = document.querySelector("#buttonDif");
const buttonMult = document.querySelector("#buttonMult");
const buttonDiv = document.querySelector("#buttonDiv");
let operandA;
let operandB;
let result = document.querySelector("#result");
const operandAInput = document.querySelector("#operandA");
const operandBInput = document.querySelector("#operandB");

operandAInput.addEventListener("input", () => {
  operandA = parseFloat(operandAInput.value);
});

operandBInput.addEventListener("input", () => {
  operandB = parseFloat(operandBInput.value);
});

buttonSum.addEventListener("click", () => {
  result.innerHTML =
    operandA && operandB
      ? `Result : ${operandA + operandB}`
      : "<span class='text-danger'>Please enter values for both operands.</span>";
});

buttonDif.addEventListener("click", () => {
  result.innerHTML =
    operandA && operandB
      ? `Result : ${operandA - operandB}`
      : "<span class='text-danger'>Please enter values for both operands.</span>";
});

buttonMult.addEventListener("click", () => {
  result.innerHTML =
    operandA && operandB
      ? `Result : ${operandA * operandB}`
      : "<span class='text-danger'>Please enter values for both operands.</span>";
});

buttonDiv.addEventListener("click", () => {
  result.innerHTML =
    operandA && operandB
      ? `Result : ${operandA / operandB}`
      : "<span class='text-danger'>Please enter values for both operands.</span>";
});