const url =
  "https://crudcrud.com/api/2c319fb4710842a9abc9ec0d65e7500b/services";
const price = document.querySelector("#price");
const productName = document.querySelector("#productName");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const priceValue = price.value;
  const productNameValue = productName.value;

  if (priceValue === "" || productNameValue === "") {
    alert("Please fill in all fields");
  } else {
    const productObj = {
      price: priceValue,
      productName: productNameValue,
    };

    postAxios(productObj);
  }
  form.reset();
});

async function postAxios(productObj) {
  try {
    const response = await axios.post(url, productObj);
    console.log(response.data); // Log the response data
    getAxios(); // Fetch and display the updated product list
  } catch (error) {
    console.log(error);
  }
}

async function getAxios() {
  try {
    const response = await axios.get(url);
    const products = response.data;
    displayProducts(products);
    calculateAndDisplaySum(products);
  } catch (error) {
    console.log(error);
  }
}

async function deleteAxios(productId) {
  try {
    const deleteUrl = `${url}/${productId}`;
    const response = await axios.delete(deleteUrl);
    console.log(response.data);
    getAxios(); // Fetch and display the updated product list after deletion
  } catch (error) {
    console.log(error);
  }
}

function displayProducts(products) {
  const outputList = document.querySelector("#output");
  outputList.innerHTML = ""; // Clear the existing list

  products.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
            ${product.productName} => Rs.${product.price}
            <button class="btn btn-danger btn-sm float-end" onclick="deleteAxios('${product._id}')">Delete</button>
        `;
    outputList.appendChild(li);
  });
}

function calculateAndDisplaySum(products) {
  let sum = 0;
  const outputList = document.querySelector("#Sum");
  products.forEach((product) => {
    sum += parseInt(product.price);
  });
  outputList.innerHTML = `Product Cost: Rs.${sum}`;
}
// Initial fetch to display products on page load
getAxios();
