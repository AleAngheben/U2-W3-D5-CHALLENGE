const productName = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const imageUrl = document.getElementById("imageUrl");
const price = document.getElementById("price");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

// const params = new URLSearchParams(window.location.search);
// const productId = params.get("appId");

// const URL = productId
//   ? "https://striveschool-api.herokuapp.com/api/agenda/" + productId
//   : "https://striveschool-api.herokuapp.com/api/agenda/";
// const method = productId ? "PUT" : "POST";

const productCreate = async () => {
  try {
    const productObj = {
      name: productName.value,
      description: description.value,
      brand: brand.value,
      imageUrl: imageUrl.value,
      price: price.value,
    };

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(productObj),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("successfully create:", data);

      productName.value = "";
      description.value = "";
      brand.value = "";
      imageUrl.value = "";
      price.value = "";
    } else {
      console.log("failed create");
    }
  } catch (error) {
    console.log("We had some problems!", error);
  }
};

document
  .getElementById("back-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    productCreate();
  });

const backofficeList = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const backList = document.getElementById("product-list");

    data.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");

      listItem.innerHTML = `   <h5>Nome prodotto: ${product.name}</h5>
      <p>Prezzo: ${product.price} €</p>

      <button class="btn btn-warning d-inline mb-2">Modifica</button>
      <button class="btn btn-danger d-inline mb-2" onclick="deleteProduct('${product._id}')">Elimina</button>`;

      backList.appendChild(listItem);
    });
  } catch (error) {
    console.log("Problem with list", error);
  }
};

window.onload = () => {
  backofficeList();
  editProduct();
};

const editProduct = async (editProductId) => {
  try {
    const response = await fetch(URL + editProductId, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
        "Content-Type": "application/json",
      },
    });

    const product = await response.json();

    // Precompila i campi del form con i dettagli del prodotto
    productName.value = product.name;
    description.value = product.description;
    brand.value = product.brand;
    imageUrl.value = product.imageUrl;
    price.value = product.price;

    // Aggiungi l'ID del prodotto come attributo data al form per l'aggiornamento
    document
      .getElementById("back-form")
      .setAttribute("data-product-id", editProductId);
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del prodotto", error);
  }
};

// FUNZIONE PER ELIMINARE UN OGGETTO CON UN BOTTONE

const deleteProduct = async (deleteProductId) => {
  try {
    const acceptDelete = confirm(
      "Sei sicuro di voler eliminare questo prodotto?"
    );

    if (acceptDelete) {
      const response = await fetch(URL + deleteProductId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
          "Content-Type": "application/json",
        },
      });
      const product = await response.json();
      alert("hai eliminato " + product.name);
    }
  } catch (error) {}
};
