window.onload = function() {
    showEmailInNavbar()
    }

    document.addEventListener("DOMContentLoaded", function() {
        modeDark();
      });

    // Realizar la solicitud AJAX al carrito de compras
fetch(CART_INFO_URL + "25801" + EXT_TYPE)
.then(response => response.json())
.then(cartData => {
  // Obtener la información del carrito y del producto precargado
  const user = cartData.user;
  const articles = cartData.articles;

  // Verificar si hay productos en el carrito
  if (articles.length > 0) {
    // Crear una tabla para mostrar los productos
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

    // Recorrer y mostrar los productos
    articles.forEach(product => {
      const row = document.createElement("tr");

      const cellImage = document.createElement("td");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      image.style.width = "10rem"; 
      image.style.height = "auto";
      cellImage.appendChild(image);

      const cellName = document.createElement("td");
      cellName.textContent = product.name;

      const cellCurrency = document.createElement("td");
      cellCurrency.textContent = product.currency;

      const cellCost = document.createElement("td");
      cellCost.textContent = product.unitCost;

      const cellQuantity = document.createElement("td");
      const inputQuantity = document.createElement("input");
      inputQuantity.type = "text"; 
      inputQuantity.value = product.count;
      inputQuantity.className = "hidden-input";
      cellQuantity.appendChild(inputQuantity);

      const cellSubtotal = document.createElement("td");
      cellSubtotal.textContent = product.unitCost * product.count;

      row.appendChild(cellImage);
      row.appendChild(cellName);
      row.appendChild(cellCurrency);
      row.appendChild(cellCost);
      row.appendChild(cellQuantity);
      row.appendChild(cellSubtotal);

      tbody.appendChild(row);

      inputQuantity.addEventListener("input", function() {
        const newQuantity = parseInt(inputQuantity.value, 10); // Obtener la nueva cantidad como número entero
        if (!isNaN(newQuantity)) {
          // Verificar si la entrada es un número válido
          const newSubtotal = newQuantity * product.unitCost; // Calcular el nuevo subtotal
          cellSubtotal.textContent = newSubtotal; // Actualizar el contenido del subtotal
        }
      });
    });

    table.appendChild(tbody);

    // Agregar la tabla al documento
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.appendChild(table);
  } else {
    // Si no hay productos en el carrito, mostrar un mensaje
    const cartContainer = document.getElementById("cartContainer");
    const message = document.createElement("p");
    message.textContent = "El carrito está vacío.";
    cartContainer.appendChild(message);
  }
})
.catch(error => {
  console.error("Error al obtener el carrito de compras:", error);
});
