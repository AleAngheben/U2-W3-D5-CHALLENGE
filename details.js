document.addEventListener("DOMContentLoaded", async () => {
  const detailsContainer = document.getElementById("details-container");
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  if (!productId) {
    console.error("ID del prodotto non trovato nella query string");
    return;
  }

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

    const detailsHTML = `
        <h1>${productDetails.name}</h1>
       <div class="d-flex gap-5 mt-5 align-items-center">
            <div class="border rounded-5 overflow-hidden">
              <img src="${productDetails.imageUrl}" alt="Immagine prodotto" style="width: 300px" />
            </div>
           <div>
                <p class = "fs-5">${productDetails.description}</p>
                <p class = "fs-5">Prezzo: ${productDetails.price} €</p>
                <p class = "fs-5">Brand: ${productDetails.brand}</p>
                <p class = "fs-5">ID del prodotto: ${productDetails._id}</p>
                
           </div>
           
           </div   >
           <div class=" mt-5">
           <a href="http://127.0.0.1:5500/backoffice.html?productId=${productDetails._id}"><button class="btn btn-lg btn-warning me-5">Modifica</button></a>
           <a href="http://127.0.0.1:5500/homepage.html"><button class="btn btn-lg btn-outline-primary me-5"><i class="bi bi-house-door"></i></button></a>
          
         </div>
      `;

    detailsContainer.innerHTML = detailsHTML;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del prodotto", error);
  }
});
