const apiUrl = "https://crudcrud.com/api/7b463ebe3d3d43e18bab2e70721fa3ce";
const servicesUrl = `${apiUrl}/services`;
let editFunction = false;
let productIdEdit = null;

const priceInput = document.querySelector("#price");
const productNameInput = document.querySelector("#productName");
const form = document.querySelector("#form");
const searchInput = document.querySelector(".d-flex");
const outputList = document.querySelector("#output");
const sumOutput = document.querySelector("#Sum");

// Event Listeners
searchInput.addEventListener("keyup", handleSearch);
form.addEventListener("submit", handleFormSubmit);
outputList.addEventListener("click", handleOutputClick);

// first time load all products
getProducts();
// Search Functionality
function handleSearch(e) {
  const searchText = e.target.value.toLowerCase();
  const productItems = Array.from(outputList.querySelectorAll("li"));
  productItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
// Add the product
async function handleFormSubmit(e) {
  e.preventDefault();
  const priceValue = priceInput.value;
  const productNameValue = productNameInput.value;

  if (priceValue === "" || productNameValue === "") {
    alert("Please fill in all fields");
  } else {
    const productObj = {
      price: priceValue,
      productName: productNameValue,
    };

    if (editFunction) {
      await putFunction(productObj, editFunction, productIdEdit);
    } else {
      await postProduct(productObj);
    }
    form.reset();
  }
}
//edit product
async function handleOutputClick(e) {
  if (e.target.classList.contains("edit")) {
    const productId = e.target.parentElement.getAttribute("user_id");
    const [productName, price] =
      e.target.parentElement.firstChild.textContent.split("_");
    priceInput.value = price.trim().split("Rs.")[1];
    productNameInput.value = productName.trim();
    editFunction = true;
    productIdEdit = productId;
    // await deleteProduct(productId);
  }
}
//manage edit product
async function putFunction(productObj, editFunction, productIdEdit) {
  try {
    const response = await axios.put(
      `${servicesUrl}/${productIdEdit}`,
      productObj
    );
    getProducts();
    editFunction = false;
    productIdEdit = null;
  } catch (error) {
    console.log(error);
  }
}
//save on axios
async function postProduct(productObj) {
  try {
    const response = await axios.post(servicesUrl, productObj);
    getProducts();
  } catch (error) {
    console.log(error);
  }
}
// get requested products
async function getProducts() {
  try {
    const response = await axios.get(servicesUrl);
    const products = response.data;
    displayProducts(products);
    calculateAndDisplaySum(products);
  } catch (error) {
    console.log(error);
  }
}
//delete products
async function deleteProduct(productId) {
  try {
    const deleteUrl = `${servicesUrl}/${productId}`;
    const response = await axios.delete(deleteUrl);
    getProducts();
  } catch (error) {
    console.log(error);
  }
}
// display on screen
function displayProducts(products) {
  outputList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.setAttribute("user_id", product._id);
    li.innerHTML = `${product.productName} _ Rs.${product.price}
      <button class="btn btn-outline-danger btn-sm float-end" onclick="deleteProduct('${product._id}')">Delete</button>
      <button class="btn btn-outline-warning btn-sm float-end edit">Edit</button>`;
    outputList.appendChild(li);
  });
}
// sum calculation
function calculateAndDisplaySum(products) {
  const sum = products.reduce(
    (total, product) => total + parseInt(product.price),
    0
  );
  sumOutput.innerHTML = `Rs: ${sum}`;
}
