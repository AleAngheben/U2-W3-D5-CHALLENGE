const productName = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const imageUrl = document.getElementById("imageUrl");
const price = document.getElementById("price");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

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

      <button class="btn btn-warning d-inline mb-2">Modifica</button>`;

      backList.appendChild(listItem);
    });
  } catch (error) {
    console.log("Problem with list", error);
  }
};

window.onload = () => {
  backofficeList();
};

// const homepageDisplay = async () => {
//   try {
//     const response = await fetch(URL, {
//       method: "GET",
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkMDQyNmQxYmJlMTAwMTgzOWU2MjciLCJpYXQiOjE2OTk1NDYxNTEsImV4cCI6MTcwMDc1NTc1MX0.n6bF57FpGYml_yaLtIhrUAg10VpZY-4vrUm-nkLmsbg",
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();
//     const myRow = document.getElementById("my-row");

//     data.forEach((product) => {
//       const card = document.createElement("div");
//       card.classList.add("col-3");
//       card.innerHTML = `  <div class="card">
//       <img src="${product.imageUrl}" class="card-img-top" alt="immagine prodotto" />
//       <div class="card-body">
//         <h5 class="card-title">${product.name}</h5>
//         <p class="card-text">Price : ${product.price} € </p>
//         <a href="#" class="btn btn-primary">Details</a>
//       </div>
//     </div>`;

//       myRow.appendChild(card);
//     });
//   } catch (error) {
//     console.log("errore nel display", error);
//   }
// };
