const sectionList = document.querySelector('.containerList');
const ulBox = document.querySelector('#boxList');
const ls = localStorage;
const inputSearch = document.querySelector('#searchI');
const listas = document.querySelectorAll('.li'); 

add();

function add(){
  let data = JSON.parse(ls.getItem('data')) || [];
  
  data.map(x => {
    const li = document.createElement('li');
    li.textContent = `${x.name} - ${x.surname} - ${x.textArea} - ${x.turn}`;
    console.log(li.textContent);
    ulBox.appendChild(li);
    li.classList.add('li');
  })
}

inputSearch.addEventListener('input', () => {
  const searchText = inputSearch.value.trim();
  for (let i = 0; i < listas.length; i++) {
    const conditions = searchText !== '' && new RegExp(searchText, 'giu').test(listas[i].textContent);
    listas[i].classList.toggle("invisible", !conditions);
  } 
})

ulBox.addEventListener('dblclick', (event) => {
  event.target.remove(); 
  console.log(event.target.textContent);
});