// initialize variables:
let dashboard = document.getElementById("dashboard");
let dashSearch = document.getElementById("dash-search");
let submitDataBtn = document.getElementById("submit-data");
let inputTxt = document.getElementById("dash-inputtxt");
let inputDescription = document.getElementById("dash-descriptiontxt");
let inputSjanger = document.getElementById("dash-sjangertxt");
let inputAntallSider = document.getElementById("dash-antallsidertxt");
let bookList = [];
let bookFiltered = [];
let bookListArea = document.getElementById("bookList");
let formTxtData = document.getElementById("formTxtData");
let formSearchData = document.getElementById("search-data");
let searchResults = false;
let resetSearch = document.getElementById("resetSearch");
let deleteData = document.getElementById("delete-data");
let deleteBooks = document.getElementById("delete-books");

resetSearch.value = "Send";
deleteBooks.value = "Slett";
submitDataBtn.value = "Lagre bok";
// Only use if you want to delete localstorage files
//localStorage.removeItem("bookList");

// Loads stored data at the beginning of the script
bookList = loadData("bookList");

// Hvis array er tomt og gjort om til undefined eller null av loadData
if (Array.isArray(bookList) !== true) {
  bookList = []; // gjør det om til tomt array igjen
}

function renderPage(bookArray) {
  while (bookListArea.firstChild) {
    bookListArea.removeChild(bookListArea.firstChild);
  }
  bookArray.forEach((book) => {
    // Create elements that are used on each book
    let bookDiv = document.createElement("div");
    let bookForm = document.createElement("form");
    let bookTextTitle = document.createElement("input");
    let bookTextDesc = document.createElement("input");
    let bookTextGenre = document.createElement("input");
    let bookTextPages = document.createElement("input");
    let bookTextTitledesc = document.createElement("p");
    let bookTextDescdesc = document.createElement("p");
    let bookTextGenredesc = document.createElement("p");
    let bookTextPagesdesc = document.createElement("p");

    bookTextTitle.type = "text";
    bookTextDesc.type = "text";
    bookTextGenre.type = "text";
    bookTextPages.type = "text";
    let bookImg = document.createElement("img");
    let bookEditBtn = document.createElement("button");
    let bookFavBtn = document.createElement("button");
    let bookRemoveBtn = document.createElement("button");

    bookEditBtn.textContent = "Edit";
    bookFavBtn.textContent = "Favourite";
    bookRemoveBtn.textContent = "Slett";

    bookImg.src = "images/book.jpg";
    bookImg.alt =
      "A huge book opened by a hand with a view of a cloudy forest behind it";
    bookDiv.classList.add("bookdiv");
    bookDiv.id = `${book.id}`;
    bookEditBtn.classList.add("btn");
    bookFavBtn.classList.add("btn");
    bookRemoveBtn.classList.add("btn");
    bookTextTitle.classList.add("inputtxtarea");
    bookTextDesc.classList.add("inputtxtarea");
    bookTextGenre.classList.add("inputtxtarea");
    bookTextPages.classList.add("inputtxtarea");
    bookForm.classList.add("inputform");

    let bookTitle = book.title;
    let bookDesc = book.description;
    let bookGenre = book.sjanger;
    let bookPages = book.pages;
    // Append image to the left of the text
    bookDiv.append(bookImg);
    // Assign value title, description, genre, and pages
    bookTextTitle.value = bookTitle;
    bookTextDesc.value = bookDesc;
    bookTextGenre.value = bookGenre;
    bookTextPages.value = bookPages;

    //Assign text infront of each value
    bookTextTitledesc.textContent = "Tittel: ";
    bookTextDescdesc.textContent = "Beskrivelse: ";
    bookTextGenredesc.textContent = "Sjanger: ";
    bookTextPagesdesc.textContent = "Sider: ";

    bookForm.append(
      bookTextTitledesc,
      bookTextTitle,
      bookTextDescdesc,
      bookTextDesc,
      bookTextGenredesc,
      bookTextGenre,
      bookTextPagesdesc,
      bookTextPages
    );
    bookDiv.append(bookForm);
    bookDiv.appendChild(bookEditBtn);
    bookDiv.appendChild(bookFavBtn);
    bookDiv.appendChild(bookRemoveBtn);
    bookListArea.append(bookDiv);

    // Set title and description etc.. to default readOnly to true so that it cant be edited by default
    bookTextTitle.readOnly = true;
    bookTextDesc.readOnly = true;
    bookTextGenre.readOnly = true;
    bookTextPages.readOnly = true;
    // Click button event listener for edit button
    bookEditBtn.addEventListener("click", () => {
      // Make text editable
      bookTextTitle.readOnly = !bookTextTitle.readOnly;
      bookTextDesc.readOnly = !bookTextDesc.readOnly;
      bookTextGenre.readOnly = !bookTextGenre.readOnly;
      bookTextPages.readOnly = !bookTextPages.readOnly;
      bookTextTitle.focus();

      // Assign new values to bookList objects
      book.title = bookTextTitle.value;
      book.description = bookTextDesc.value;
      book.sjanger = bookTextGenre.value;
      book.pages = bookTextPages.value;
      // Change button name
      bookEditBtn.textContent =
        bookEditBtn.textContent === "Update"
          ? (bookEditBtn.textContent = "Edit")
          : (bookEditBtn.textContent = "Update");
      saveData("bookList", bookList);
    });
    // Click button event listener for remove button
    bookRemoveBtn.addEventListener("click", () => {
      bookListArea.removeChild(bookDiv);
      bookList = bookList.filter((b) => b.id !== book.id);
      saveData("bookList", bookList);
      renderPage(bookList);
    });
  });
}
// Function to render search results when you search for a book
function renderSearchResults() {
  renderPage(bookFiltered);
}

// if search button has not been clicked render page as usual
if (searchResults === false) {
  renderPage(bookList);
}
// else if search button has been clicked render search results
else if (searchResults === true) {
  renderSearchResults;
}
console.log(inputDescription.value, inputTxt.value);

// Eventlistnere on add book submitted to form
formTxtData.addEventListener("submit", (e) => {
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
  renderPage(bookList);
});

// Eventlistener on search button submitted to form
formSearchData.addEventListener("submit", (e) => {
  e.preventDefault();
  resetSearch.value =
    resetSearch.value === "Send"
      ? (resetSearch.value = "Reset")
      : (resetSearch.value = "Send");
  searchResults === true;
  bookFiltered = bookList.filter((b) =>
    b.title.toLowerCase().includes(dashSearch.value.toLowerCase())
  );
  // Because resetSearch.value has already been switched check for the opposite
  if (resetSearch.value === "Reset") {
    console.log("Send was pushed render search results...");
    renderSearchResults();
  } else if (resetSearch.value === "Send") {
    console.log("Reset was pushed render search results...");
    renderPage(bookList);
  }
  console.log(bookFiltered);
});
// Eventlistnere for text typing in the form search data
formSearchData.addEventListener("input", (e) => {
  e.preventDefault();
  searchResults === true;
  bookFiltered = bookList.filter((b) =>
    b.title.toLowerCase().includes(dashSearch.value.toLowerCase())
  );
  renderSearchResults();
});

// Slett alle bøker
deleteData.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Slett knappen ble trykket på");
  localStorage.removeItem("bookList");
  bookList = loadData("bookList");
  // Hvis array er tomt og gjort om til undefined eller null av loadData
  if (Array.isArray(bookList) !== true) {
    bookList = []; // gjør det om til tomt array igjen
  }
  renderPage(bookList);
});
// Functions to ease the way to save and load to localStorage
function saveData(objName, objContent) {
  return localStorage.setItem(objName, JSON.stringify(objContent));
}

function loadData(dataToLoad) {
  //Get local storage:
  return JSON.parse(localStorage.getItem(dataToLoad));
}
