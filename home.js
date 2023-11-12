const URL = "https://striveschool-api.herokuapp.com/api/product/";

const homepageDisplay = async () => {
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
    const myRow = document.getElementById("my-row");

    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("col-3");
      card.innerHTML = `  <div class="card" style="height: 350px;">
      <div style="height: 200px; overflow: hidden; ">
      <img src="${product.imageUrl}" class="card-img-top" alt="immagine prodotto" style="width: 100%; height: 100%; object-fit: cover;"/>
    </div>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price : ${product.price} € </p>
          <a href="http://127.0.0.1:5500/details.html?productId=${product._id}" class="btn btn-primary">Details</a>
          <a href="http://127.0.0.1:5500/backoffice.html?productId=${product._id}" class="btn btn-primary">Modify</a>
        </div>
      </div>`;

      myRow.appendChild(card);
    });
  } catch (error) {
    console.log("errore nel display", error);
  }
};

document.addEventListener("DOMContentLoaded", homepageDisplay);
