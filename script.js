// initialize variables:
let dashboard = document.getElementById("dashboard");
let inputTxt = document.getElementById("dash-inputtxt");
let bookList = [];
let bookListArea = document.getElementById("bookList");
localStorage.removeItem("bookList");

bookList = loadData("bookList");
if (!Array.isArray(bookList)) {
  bookList = [];
}
dashboard.addEventListener("submit", (e) => {
  e.preventDefault();
  bookList.push({
    id: bookList.length,
    title: inputTxt.value,
    description: "This is a book",
  });
  saveData("bookList", bookList);
  console.log(bookList);
  console.log(inputTxt.value, "was stored");
  bookList = bookList
    .map((book) => `${book.title} is the book you wrote in`)
    .join("\n");
  bookListArea.append(bookList);
});

function saveData(objName, objContent) {
  return localStorage.setItem(objName, JSON.stringify(objContent));
}

function loadData(dataToLoad) {
  //Get local storage:
  return JSON.parse(localStorage.getItem(dataToLoad));
}
