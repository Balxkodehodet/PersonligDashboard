// initialize variables:
let dashboard = document.getElementById("dashboard");
let inputTxt = document.getElementById("dash-inputtxt");
let bookList = [];

//Get local storage:
let storedData = JSON.parse(localStorage.getItem("BookList"));
dashboard.addEventListener("submit", (e) => {
  e.preventDefault();
  bookList.push(inputTxt.value);
  localStorage.setItem("BookList", JSON.stringify(bookList));
  console.log(bookList);
  console.log(inputTxt.value, "was stored");
});
