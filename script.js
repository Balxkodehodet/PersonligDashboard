// initialize variables:
let dashboard = document.getElementById("dashboard");
let inputTxt = document.getElementById("dash-inputtxt");
let inputDescription = document.getElementById("dash-descriptiontxt");
let inputSjanger = document.getElementById("dash-sjangertxt");
let inputAntallSider = document.getElementById("dash-antallsidertxt");
let bookList = [];
let bookListArea = document.getElementById("bookList");

// Only use if you want to delete localstorage files
//localStorage.removeItem("bookList");

bookList = loadData("bookList");

// Hvis array er tomt og gjort om til undefined eller null av loadData
if (Array.isArray(bookList) !== true) {
  bookList = [];
}

function renderPage() {
  while (bookListArea.firstChild) {
    bookListArea.removeChild(bookListArea.firstChild);
  }
  bookList.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("bookdiv");
    bookDiv.textContent = `bok tittel: ${book.title}. Beskrivelse: ${book.description}. Sjanger: ${book.sjanger}. Antall sider: ${book.pages}`;
    bookListArea.append(bookDiv);
  });
}
renderPage();

console.log(inputDescription.value, inputTxt.value);

dashboard.addEventListener("submit", (e) => {
  e.preventDefault();
  bookList.push({
    id: bookList.length,
    title: inputTxt.value,
    description: inputDescription.value,
    sjanger: inputSjanger.value,
    pages: inputAntallSider.value,
  });
  saveData("bookList", bookList);
  console.log(bookList);
  console.log(inputTxt.value, "was stored");
  renderPage();
});

function saveData(objName, objContent) {
  return localStorage.setItem(objName, JSON.stringify(objContent));
}

function loadData(dataToLoad) {
  //Get local storage:
  return JSON.parse(localStorage.getItem(dataToLoad));
}
