document.addEventListener("DOMContentLoaded", async () => {
  const productName = document.getElementById("name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("imageUrl");
  const price = document.getElementById("price");

  const btnDelete = document.getElementById("reset-btn");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
          "Content-Type": "application/json",
        },
      }
    );

    const productDetails = await response.json();
    productName.value = productDetails.name;
    description.value = productDetails.description;
    brand.value = productDetails.brand;
    imageUrl.value = productDetails.imageUrl;
    price.value = productDetails.price;

    btnDelete.innerText = "Cancella il prodotto";
  } catch (error) {
    "errore nel recupero dei valori ", error;
  }
});

// const deleteProduct = async (deleteProductId) => {
//   try {
//     const acceptDelete = confirm(
//       "Sei sicuro di voler eliminare questo prodotto?"
//     );

//     if (acceptDelete) {
//       const response = await fetch(URL + deleteProductId, {
//         method: "DELETE",
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
//           "Content-Type": "application/json",
//         },
//       });
//       const product = await response.json();
//       alert("hai eliminato " + product.name);
//     }
//   } catch (error) {}
// };

// btnDelete.addEventListener("click", function (event) {
//   event.preventDefault();
//   deleteProduct();
// });
