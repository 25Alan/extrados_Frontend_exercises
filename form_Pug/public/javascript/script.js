const form = document.querySelector("form");
const button = document.querySelector("button");
const buttonSun = document.querySelector("input[name = 'check']");

const inputName = document.querySelector("#inputName");
const inputSurname = document.querySelector("#inputSurname");

const labelName = document.querySelector("#labelName");
const labelSurname = document.querySelector("#labelSurname");


form.addEventListener('submit', (event) => {
  event.preventDefault();
});

buttonSun.addEventListener("click", (event) => {
  if (event.target.checked) {
    document.querySelector("body").classList.add("bodyW");
    form.classList.add("boxFormShadow");
  } else {
    document.querySelector("body").classList.remove("bodyW");
    form.classList.remove("boxFormShadow");
  }
});

inputName.addEventListener("change", () => {
  const checkName = inputName.value.length > 0;

  if (checkName) labelName.classList.add("validInput");
  else labelName.classList.add("invalidInput");  
});

inputSurname.addEventListener("change", () => {
  const checkSurname = inputSurname.value.length > 0;

  if (checkSurname) labelSurname.classList.add("validInput");
  else labelSurname.classList.add("invalidInput");
});

button.addEventListener('click', () => { 
  button.style.backgroundColor = '#000000'; 
  button.textContent = 'Enviado';

  let dataForm = {};
  let data = JSON.parse(localStorage.getItem('data')) || [];

  dataForm = {
    'name' : inputName.value,
    'surname' : inputSurname.value,
    'textArea' :document.querySelector('#textAreaInput').value,
    'turn' : document.querySelector('#selectInput').value}

    data.push(dataForm);

    let dataS = JSON.stringify(data);
    localStorage.setItem('data', dataS);
  });