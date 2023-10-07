window.onload = function() {
    showEmailInNavbar()
    }

    document.addEventListener("DOMContentLoaded", function() {
        modeDark();
      });

  // Función que muestra los productos del carrito del cliente.
  function ShowCartItems(cartData) {
  
  const articles = cartData.articles;

  // Con un condicional verificamos si hay productos en el carrito, y si los hay los mostramos en una tabla.
  if (articles.length > 0) {
    
    const table = document.createElement("table");
    table.className = "table";

    const tbody = document.createElement("tbody");

    // Encabezado de la tabla
    const headerRow = document.createElement("tr");
    const headerImage = document.createElement("th");
    const headerName = document.createElement("th");
    headerName.textContent = "Nombre";
    const headerCurrency = document.createElement("th");
    const headerCost = document.createElement("th");
    headerCost.textContent = "Costo";
    const headerQuantity = document.createElement("th");
    headerQuantity.textContent = "Cantidad";
    const headerSubtotal = document.createElement("th");
    headerSubtotal.textContent = "Subtotal";

    headerRow.appendChild(headerImage);
    headerRow.appendChild(headerName);
    headerRow.appendChild(headerCurrency);
    headerRow.appendChild(headerCost);
    headerRow.appendChild(headerQuantity);
    headerRow.appendChild(headerSubtotal);

    tbody.appendChild(headerRow);

    // Usamos un forEach para recorrer el array y mostrar los productos en nuestra tabla.
    articles.forEach(product => {
      const row = document.createElement("tr");

      const cellImage = document.createElement("td");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      image.style.width = "10rem"; 
      image.style.height = "auto";
      cellImage.appendChild(image);

      const name = document.createElement("td");
      name.textContent = product.name;

      const currency = document.createElement("td");
      currency.textContent = product.currency;

      const cost = document.createElement("td");
      cost.textContent = product.unitCost;

      // Mostramos la cantidad de artículos en un input
      const cellQuantity = document.createElement("td");
      const inputQuantity = document.createElement("input");
      inputQuantity.type = "text"; 
      inputQuantity.value = product.count;
      inputQuantity.className = "hidden-input";
      cellQuantity.appendChild(inputQuantity);

      // Calculamos el subtotal de acuerdo a la cantidad de productos y el valor unitario.
      const subtotal = document.createElement("td");
      subtotal.textContent = product.unitCost * product.count;

      row.appendChild(cellImage);
      row.appendChild(name);
      row.appendChild(currency);
      row.appendChild(cost);
      row.appendChild(cellQuantity);
      row.appendChild(subtotal);

      tbody.appendChild(row);

      //Controlador de eventos input para que se modifique el subtotal según el valor ingresado en la cantidad
      inputQuantity.addEventListener("input", function() {
        const newQuantity = parseInt(inputQuantity.value, 10);
        if (!isNaN(newQuantity)) {
          const newSubtotal = newQuantity * product.unitCost; 
          subtotal.textContent = newSubtotal; 
        }
      });
    });

    table.appendChild(tbody);

    
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.appendChild(table);
  } else {

    // Si no hay productos en el carrito, mostrar un mensaje
    const cartContainer = document.getElementById("cartContainer");
    const message = document.createElement("p");
    message.textContent = "El carrito está vacío.";
    cartContainer.appendChild(message);
  }
};

// Obtenemos el carrito guardado en el almacenamiento local.
const cart = JSON.parse(localStorage.getItem("cart"));

// Fetch al JSON
fetch(CART_INFO_URL + "25801" + EXT_TYPE)
  .then(response => response.json())
  .then(cartData => {

    // Verificamos si hay productos en el almacenamiento local y en el caso de haberlos los combinamos con los traidos del json.
    if (cart && cart.length > 0) {
      cartData.articles = [...cart, ...cartData.articles];
    }
    ShowCartItems(cartData);
  })
  .catch(error => {
    console.error("Error al obtener el carrito de compras:", error);
  });






