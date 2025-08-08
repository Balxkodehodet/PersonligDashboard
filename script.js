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
  bookList = []; // gjør det om til tomt array igjen
}

function renderPage() {
  while (bookListArea.firstChild) {
    bookListArea.removeChild(bookListArea.firstChild);
  }
  bookList.forEach((book) => {
    // Create elements that are used on each book
    let bookDiv = document.createElement("div");
    let bookForm = document.createElement("form");
    let bookTextTitle = document.createElement("input");
    let bookTextDesc = document.createElement("input");
    let bookTextGenre = document.createElement("input");
    let bookTextPages = document.createElement("input");
    bookTextTitle.type = "text";
    bookTextDesc.type = "text";
    bookTextGenre.type = "text";
    bookTextPages.type = "text";
    let bookImg = document.createElement("img");
    let bookEditBtn = document.createElement("button");
    let bookFavBtn = document.createElement("button");

    bookEditBtn.textContent = "Edit";
    bookFavBtn.textContent = "Favourite";

    bookImg.src = "images/book.jpg";
    bookImg.alt =
      "A huge book opened by a hand with a view of a cloudy forest behind it";
    bookDiv.classList.add("bookdiv");
    bookEditBtn.classList.add("btn");
    bookFavBtn.classList.add("btn");
    bookTextTitle.classList.add("txtarea");
    bookTextDesc.classList.add("txtarea");
    bookTextGenre.classList.add("txtarea");
    bookTextPages.classList.add("txtarea");
    bookForm.classList.add("inputform");

    let bookTitle = `Bok tittel: ${book.title}.\n`;
    let bookDesc = `Beskrivelse: ${book.description}.\n`;
    let bookGenre = `Sjanger: ${book.sjanger}.\n`;
    let bookPages = `Antall sider: ${book.pages}.\n`;
    // Append image to the left of the text
    bookDiv.append(bookImg);
    // Append title, description, genre, and pages with br between
    //bookTextArea.readOnly = true;
    bookTextTitle.value = bookTitle;
    bookTextDesc.value = bookDesc;
    bookTextGenre.value = bookGenre;
    bookTextPages.value = bookPages;
    // bookTextArea.appendChild(document.createElement("br"));
    // bookTextArea.appendChild(bookDesc);
    // bookTextArea.appendChild(document.createElement("br"));
    // bookTextArea.appendChild(bookGenre);
    // bookTextArea.appendChild(document.createElement("br"));
    // bookTextArea.appendChild(bookPages);
    bookForm.append(bookTextTitle, bookTextDesc, bookTextGenre, bookTextPages);
    bookDiv.append(bookForm);
    bookDiv.appendChild(bookEditBtn);
    bookDiv.appendChild(bookFavBtn);
    bookListArea.append(bookDiv);

    // Click button event listener
    bookEditBtn.addEventListener("click", () => {
      // Change button name
      bookEditBtn.textContent =
        bookEditBtn.textContent === "Update"
          ? (bookEditBtn.textContent = "Edit")
          : (bookEditBtn.textContent = "Update");
      // create text area to change title
      // let bookTxtform = document.createElement("form");
      // let bookTxtArea = document.createElement("textarea");
      // let bookTxtSubmit = document.createElement("input");
      // bookTxtSubmit.type = "submit";
      // bookTxtform.append(bookTxtArea, bookTxtSubmit);
      // bookDiv.append(bookTxtform);

      bookDiv.readOnly = !bookDiv.readOnly;
      //bookDiv.textContent = bookDiv.value;
      bookDiv.focus();
    });
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
