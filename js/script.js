//Task-Make a navbar link active

//const navList = document.querySelector('ul.navbar-nav');
// const links=document.querySelectorAll();
// links.addEventListener("click", toActive);

// function toActive(e){
//   e.target()
// }

//click to local to window onload to add active
activeDict = {
  activeURL: window.location.pathname,
  previouslyActiveId: "home",
};
window.localStorage.setItem("activeDict", JSON.stringify(activeDict));
const prevID = window.localStorage.getItem("activeDict").previouslyActiveId;
if (prevID !== null) {
  var prevActive = document.getElementById(prevID);
  prevActive.classList.remove("active");
}
const activeURLClass = document.querySelector(
  'a[href="' + localStorage.getItem("activeURL") + '"]'
);
if (activeURLClass !== null) {
  activeURLClass[0].classList.add("active");
  activeDict.previouslyActiveId=activeURLClass.id;
  localStorage.setItem('activeDict',JSON.stringify(activeDict))
}
// const links = document.querySelectorAll('ul.navbar-nav > li > a.active');
// activeLink={
//   'id':links[0].id,
//   'href':links[0].href
// }
// localStorage.setItem("actLink",activeLink)
// window.onload = function () {

// };

// const lists = document.getElementById(' actnavs ');
// //const links = lists.querySelectorAll('a');
// if(lists!=null){
//   lists.addEventListener('load',toActive)
// }
// function toActive(e) {
//   //e.preventDefault();
//   //const path = links.pathname;
//   //localStorage.setItem('')
//   const current = document.getElementsByClassName("active");
//   if (current.length > 0) {
//     current[0].classList.remove("active");
//   }
//   //localStorage.setItem("active", window.location.pathname);
//   e.target.classList.add("active");
// }

// // Add one listener to the list element
// lists.addEventListener('click', handleClick);

// // If the clicked element is a link remove all
// // the active classes from the other links, and then
// // add the active class to the link that was clicked on
// function handleClick(e) {
//   if (e.target.matches('a')) {
//     links.forEach(link => link.classList.remove('active'));
//     e.target.classList.add('active');
//   }
// }
// const links=navItems.forEach(nav=>{
//   var navID=nav.id;
//   var windowsLocation=window.location.pathname
// })

//document.querySelectorAll('ul.navbar-nav > li > a').forEach((nav) => {          //can select child class as well with > sign
// if (nav.pathname === window.location.pathname) {
//   nav.classList.add('active')
// } else {
//   nav.classList.remove('active')
// }
// })

//1
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


//getting local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Add Transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
      })">x</button>
      `;
  list.appendChild(item);
}

//Update the balance income and expence
function updateValues() {
  //Get amount value
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log("Amounts", amounts);
  //Calculate balance
  const total = amounts
    .reduce((acc, item) => (acc += item), 0) //Sums up
    .toFixed(2); //two place after decimal
  console.log("Balance", total);
  //Calculate income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  console.log("Income", income);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  console.log("Expense", expense);
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  Init();
}

//update Local Storage Transaction
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener("submit", addTransaction);
