const bitcoin = document.getElementById("bitcoin");
const ethereum = document.getElementById("ethereum");
const Litecoin = document.getElementById("Litecoin");

async function getRequest() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2CLitecoin&vs_currencies=INR"
    );

    bitcoin.innerHTML = response.data.bitcoin.inr.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
    ethereum.innerHTML = response.data.ethereum.inr.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
    Litecoin.innerHTML = response.data.litecoin.inr.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
  } catch (error) {
    console.log(error);
  }
}
getRequest();
