const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
if (productId) {
  const btnDelete = document.getElementById("reset-btn");
  const btnSend = document.getElementById("send-btn");
  const titleBackoffice = document.getElementById("backoffice-title");

  document.addEventListener("DOMContentLoaded", async () => {
    const productName = document.getElementById("name");
    const description = document.getElementById("description");
    const brand = document.getElementById("brand");
    const imageUrl = document.getElementById("imageUrl");
    const price = document.getElementById("price");
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

      titleBackoffice.innerText = "Gestione prodotto";
      btnDelete.innerText = "Cancella il prodotto ✖️";
      btnSend.innerText = "Modifica ✔️";
    } catch (error) {
      "errore nel recupero dei valori ", error;
    }
  });

  //FUNZIONE PER ELIMINARE IL PRODOTTO

  const deleteProduct = async (deleteProductId) => {
    try {
      const acceptDelete = confirm(
        "Sei sicuro di voler eliminare questo prodotto?"
      );

      if (acceptDelete) {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/product/${deleteProductId}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
              "Content-Type": "application/json",
            },
          }
        );
        const product = await response.json();
        alert("hai eliminato " + product.name);
        window.location.href = "http://127.0.0.1:5500/homepage.html";
      }
    } catch (error) {
      "Errore all'eliminazine del prodotto", error;
    }
  };

  btnDelete.addEventListener("click", function (event) {
    event.preventDefault();
    deleteProduct(productId);
  });

  //FUNZIONE PER MODIFICARE IL PRODOTTO

  const modifyProduct = async (productId) => {
    const productNameValue = document.getElementById("name").value;
    const descriptionValue = document.getElementById("description").value;
    const brandValue = document.getElementById("brand").value;
    const imageUrlValue = document.getElementById("imageUrl").value;
    const priceValue = document.getElementById("price").value;

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/product/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productNameValue,
            description: descriptionValue,
            brand: brandValue,
            imageUrl: imageUrlValue,
            price: priceValue,
          }),
        }
      );

      const modifiedProduct = await response.json();
      alert("Hai modificato il prodotto: " + modifiedProduct.name);
      window.location.href = "http://127.0.0.1:5500/homepage.html";
    } catch (error) {
      console.error("Errore durante la modifica del prodotto", error);
    }
  };

  btnDelete.addEventListener("click", function (event) {
    event.preventDefault();
    deleteProduct(productId);
  });

  btnSend.addEventListener("click", function (event) {
    event.preventDefault();
    modifyProduct(productId);
  });
}
