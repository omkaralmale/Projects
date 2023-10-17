function addExpenseData(Amount, Description, Category) {
  const listManager = document.getElementById("manager");
  let newList = document.createElement("li");
  newList.className = "list-group";

  var itemContainer = document.createElement("div");

  var text = document.createTextNode(
    `Rs. ${Amount} - ${Description}  - ${Category}`
  );
  itemContainer.appendChild(text);

  var delBtn = document.createElement("button");
  delBtn.className = "btn btn-outline-danger m-2 delete";
  delBtn.appendChild(document.createTextNode("Delete"));
  itemContainer.appendChild(delBtn);

  var editBtn = document.createElement("button");
  editBtn.className = "btn btn-outline-warning m-2 edit";
  editBtn.appendChild(document.createTextNode("Edit"));
  itemContainer.appendChild(editBtn);

  newList.appendChild(itemContainer);
  listManager.appendChild(newList);
}

const Details = document.getElementById("Eform");
Details.addEventListener("submit", function addExpenseList(event) {
  event.preventDefault();
  const Amount = document.getElementById("Amt").value;
  const Description = document.getElementById("Dsc").value.toUpperCase();
  const Category = document
    .getElementById("inputGroupSelect04")
    .value.toUpperCase();

  const expenseObj = {
    Amount: Amount,
    Description: Description,
    Category: Category,
  };

  const DataJson = JSON.stringify(expenseObj);
  localStorage.setItem(Amount, DataJson);
  Details.reset();

  addExpenseData(
    expenseObj.Amount,
    expenseObj.Description,
    expenseObj.Category
  );
});

var ul = document.getElementById("manager");
ul.addEventListener("click", deleteUser);

function deleteUser(e) {
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement.parentElement;
    var text = li.firstChild.textContent;
    var texts = text.split(" ");
    const key = texts[1];
    localStorage.removeItem(key);
    ul.removeChild(li);
  }
}

var ulEdit = document.getElementById("manager");
ulEdit.addEventListener("click", edituser);

function edituser(e) {
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement.parentElement;
    var text = li.firstChild.textContent;

    var texts = text.split(" ");
    const key = texts[1];

    var Amount = document.getElementById("Amt");
    var Description = document.getElementById("Dsc");
    var category = document.getElementById("inputGroupSelect04");

    Amount.value = key;
    Description.value = texts[3];
    category.value = texts[5];

    localStorage.removeItem(key);
    ul.removeChild(li);
  }
}

function displayUsers() {
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    addExpenseData(key, value.Description, value.Category);
  }
}

window.addEventListener("load", () => {
  displayUsers();
});
