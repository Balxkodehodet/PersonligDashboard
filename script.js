// initialize variables:
let dashboard = document.getElementById("dashboard");
let dashSearch = document.getElementById("dash-search");
let dashSearchAuthor = document.getElementById("dash-search-author");
let submitDataBtn = document.getElementById("submit-data");
let inputTxt = document.getElementById("dash-inputtxt");
let inputAuthor = document.getElementById("dash-authortxt");
let inputDescription = document.getElementById("dash-descriptiontxt");
let inputSjanger = document.getElementById("dash-sjangertxt");
let inputAntallSider = document.getElementById("dash-antallsidertxt");
let bookList = []; // BookList to contain all books
let bookFiltered = []; // Array to contain all books that are filtered through search or favourites
let bookListArea = document.getElementById("bookList");
let formTxtData = document.getElementById("formTxtData");
let formSearchData = document.getElementById("search-data");
let formSearchAuthor = document.getElementById("search-data-author");
let searchResults = false;
let resetSearch = document.getElementById("resetSearch");
let resetSearchAuthor = document.getElementById("resetSearchAuthor");
let showFavBooksBtn = document.getElementById("show-favbooks");
let deleteData = document.getElementById("delete-data");
let deleteBooks = document.getElementById("delete-books");
let showAllFavForm = document.getElementById("show-fav");
let sortForm = document.getElementById("sortering");
let totalBooksEachGenre = document.createElement("p");

resetSearch.value = "Send";
showFavBooksBtn.value = "Send";
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

// Show books by genre through reduce
const booksByGenre = bookList.reduce((acc, bookGenre) => {
  acc[bookGenre.sjanger] = (acc[bookGenre.sjanger] || 0) + 1;
  return acc;
}, {});
console.log("BOOKS BY GENRE: ", booksByGenre);

totalBooksEachGenre.textContent += " Totalt bøker i Sjanger: ";
for (let genre in booksByGenre) {
  totalBooksEachGenre.textContent += " ";
  totalBooksEachGenre.textContent += genre;
  totalBooksEachGenre.textContent += " : ";
  totalBooksEachGenre.textContent += booksByGenre[genre];
  totalBooksEachGenre.textContent += " bøker! ";
}

totalBooksEachGenre.classList.add("each-genre");
dashboard.append(totalBooksEachGenre);

function renderPage(bookArray) {
  while (bookListArea.firstChild) {
    bookListArea.removeChild(bookListArea.firstChild);
  }
  bookArray.forEach((book) => {
    // Create elements that are used on each book
    let bookDiv = document.createElement("div");
    let bookForm = document.createElement("form");
    let bookTextTitle = document.createElement("input");
    let bookTextAuthor = document.createElement("input");
    let bookTextDesc = document.createElement("textarea");
    let bookTextGenre = document.createElement("input");
    let bookTextPages = document.createElement("input");
    let bookTextTitledesc = document.createElement("p");
    let bookTextAuthordesc = document.createElement("p");
    let bookTextDescdesc = document.createElement("p");
    let bookTextGenredesc = document.createElement("p");
    let bookTextPagesdesc = document.createElement("p");

    bookTextAuthor.type = "text";
    bookTextTitle.type = "text";
    //bookTextDesc er en textarea og trenger ikke type
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
    bookImg.classList.add("book-img");
    bookDiv.classList.add("bookdiv");
    bookDiv.id = `${book.id}`;
    bookEditBtn.classList.add("btn");
    bookFavBtn.classList.add("btn");
    bookRemoveBtn.classList.add("btn");
    bookTextTitle.classList.add("inputtxtarea");
    bookTextDesc.classList.add("inputtxtarea");
    bookTextAuthor.classList.add("inputtxtarea");
    bookTextGenre.classList.add("inputtxtarea");
    bookTextPages.classList.add("inputtxtarea");
    bookForm.classList.add("inputform");

    let bookTitle = book.title;
    let bookAuthor = book.author;
    let bookDesc = book.description;
    let bookGenre = book.sjanger;
    let bookPages = book.pages;
    // Append image to the left of the text
    bookDiv.append(bookImg);
    // Assign value title, description, genre, and pages
    bookTextTitle.value = bookTitle;
    bookTextAuthor.value = bookAuthor;
    bookTextDesc.value = bookDesc;
    bookTextGenre.value = bookGenre;
    bookTextPages.value = bookPages;

    //Assign text infront of each value
    bookTextTitledesc.textContent = "Tittel: ";
    bookTextAuthordesc.textContent = "Forfatter: ";
    bookTextDescdesc.textContent = "Beskrivelse: ";
    bookTextGenredesc.textContent = "Sjanger: ";
    bookTextPagesdesc.textContent = "Sider: ";

    bookForm.append(
      bookTextTitledesc,
      bookTextTitle,
      bookTextAuthordesc,
      bookTextAuthor,
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
    if (book.isFavourite) {
      // Create favourite star and append it to book
      const favImg = document.createElement("img");
      favImg.src = "images/star.png";
      favImg.alt = "A yellow golden star";
      favImg.classList.add("fav-img");
      bookDiv.appendChild(favImg);
    }
    bookListArea.append(bookDiv);

    // Set title and description etc.. to default readOnly to true so that it cant be edited by default
    bookTextTitle.readOnly = true;
    bookTextAuthor.readOnly = true;
    bookTextDesc.readOnly = true;
    bookTextGenre.readOnly = true;
    bookTextPages.readOnly = true;
    // Click button event listener for edit button
    bookEditBtn.addEventListener("click", () => {
      // Make text editable
      bookTextTitle.readOnly = !bookTextTitle.readOnly;
      bookTextAuthor.readOnly = !bookTextAuthor.readOnly;
      bookTextDesc.readOnly = !bookTextDesc.readOnly;
      bookTextGenre.readOnly = !bookTextGenre.readOnly;
      bookTextPages.readOnly = !bookTextPages.readOnly;
      bookTextTitle.focus();

      // Assign new values to bookList objects
      book.title = bookTextTitle.value;
      book.author = bookTextAuthor.value;
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
      bookDiv.classList.add("delete");
      setTimeout(() => {
        bookListArea.removeChild(bookDiv);
        bookList = bookList.filter((b) => b.id !== book.id);
        saveData("bookList", bookList);
        renderPage(bookList);
      }, 1000);
    });
    // The addeventlistener itself for favourite button
    bookFavBtn.addEventListener("click", () => {
      book.isFavourite = !book.isFavourite;
      saveData("bookList", bookList);
      if (book.isFavourite) {
        // Only create img if book.isfavourite..
        const favImg = document.createElement("img");
        favImg.src = "images/star.png";
        favImg.classList.add("fav-img");
        if (!bookDiv.contains(favImg)) {
          bookDiv.append(favImg);
        }
      } else {
        const existingFavImg = bookDiv.querySelector(".fav-img");
        if (existingFavImg) {
          bookDiv.removeChild(existingFavImg);
        }
      }
    });
  });
}
// Function to render search results when you search for a book
function renderSearchResults() {
  renderPage(bookFiltered);
}

if (searchResults === false) {
  // if search button has not been clicked render page as usual
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
    author: inputAuthor.value,
    description: inputDescription.value,
    sjanger: inputSjanger.value,
    pages: inputAntallSider.value,
    isFavourite: false,
  });
  saveData("bookList", bookList);
  console.log(bookList);
  console.log(inputTxt.value, "was stored");
  renderPage(bookList);
});

// Eventlistnere for text typing in the form search data for author
formSearchAuthor.addEventListener("input", (e) => {
  e.preventDefault();
  searchResults === true;
  bookFiltered = bookList.filter((b) =>
    b.author.toLowerCase().includes(dashSearchAuthor.value.toLowerCase())
  );
  renderSearchResults();
});
// Eventlistener for submit search data for author
formSearchAuthor.addEventListener("submit", (e) => {
  e.preventDefault();
  resetSearchAuthor.value =
    resetSearchAuthor.value === "Send"
      ? (resetSearchAuthor.value = "Reset")
      : (resetSearchAuthor.value = "Send");
  searchResults === true;
  bookFiltered = bookList.filter((b) =>
    b.author.toLowerCase().includes(dashSearchAuthor.value.toLowerCase())
  );
  // Because resetSearchAuthor.value has already been switched check for the opposite
  if (resetSearchAuthor.value === "Reset") {
    console.log("Send was pushed render search results...");
    renderSearchResults();
  } else if (resetSearchAuthor.value === "Send") {
    console.log("Reset was pushed render search results...");
    renderPage(bookList);
  }
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
  let bookFullListArea = document.querySelectorAll(".bookdiv");
  // For each book div add delete animations class
  bookFullListArea.forEach((book) => {
    book.classList.add("delete");
  });
  // Set timeout so that it deletes data and runs AFTER the animation has run
  setTimeout(() => {
    console.log("Slett knappen ble trykket på");
    localStorage.removeItem("bookList");
    bookList = loadData("bookList");
    // Hvis array er tomt og gjort om til undefined eller null av loadData
    if (Array.isArray(bookList) !== true) {
      bookList = []; // gjør det om til tomt array igjen
    }
    renderPage(bookList);
  }, 1000); // Wait for 1 (1000ms) second
});

// eventlistener to show all favourites on submit button
showAllFavForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showFavBooksBtn.value =
    showFavBooksBtn.value === "Send"
      ? (showFavBooksBtn.value = "Reset")
      : (showFavBooksBtn.value = "Send");
  searchResults = true;
  bookFiltered = bookList.filter((b) => b.isFavourite);
  // Because showFavBooksBtn.value has already been switched check for the opposite
  if (showFavBooksBtn.value === "Reset") {
    console.log("Send was pushed render search results...");
    renderSearchResults();
  } else if (showFavBooksBtn.value === "Send") {
    console.log("Reset was pushed render search results...");
    renderPage(bookList);
  }
});
// Kode for å sortere bøkene alfabetisk eller etter antall sider.
sortForm.addEventListener("change", (e) => {
  e.preventDefault();
  bookList = sortBooks(bookList, e.target.value);
  renderPage(bookList);
});

// funksjon for å sortere bøker, alfabetisk etter forfatter eller tittel,
// eller etter antall sider lavt/høyt eller høyt/lavt
function sortBooks(booksToSort, sortMethod) {
  if (sortMethod === "Alfabetisk - forfatter") {
    booksToSort.sort((a, b) => a.author.localeCompare(b.author));
    return booksToSort;
  } else if (sortMethod === "Alfabetisk - tittel") {
    booksToSort.sort((a, b) => a.title.localeCompare(b.title));
    return booksToSort;
  } else if (sortMethod === "Antall sider - lavt til høyt") {
    booksToSort.sort((a, b) => a.pages - b.pages);
    return booksToSort;
  } else if (sortMethod === "Antall sider - høyt til lavt") {
    booksToSort.sort((a, b) => b.pages - a.pages);
    return booksToSort;
  }
}
// Functions to ease the way to save and load to localStorage
function saveData(objName, objContent) {
  return localStorage.setItem(objName, JSON.stringify(objContent));
}

function loadData(dataToLoad) {
  //Get local storage:
  return JSON.parse(localStorage.getItem(dataToLoad));
}
