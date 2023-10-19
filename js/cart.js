window.onload = function () {
  showEmailInNavbar()
}

document.addEventListener("DOMContentLoaded", function () {
  modeDark();
});

//Declaramos la variable que va a almacenar el subtotal de productos en el carrito en dólares.
let subtotalUSD = 0;

// Función que muestra los productos del carrito del cliente.
function showCartItems(cartData) {

  const articles = cartData.articles;

  // Con un condicional verificamos si hay productos en el carrito, y si los hay los mostramos en una tabla.
  if (articles.length > 0) {
    const tableClasses = "table table-striped table-bordered table-responsive-md"

    const table = document.createElement("table");
    table.className = tableClasses;
    table.className = "table";

    const tbody = document.createElement("tbody");

    // Encabezado de la tabla
    const headerRow = document.createElement("tr");
    headerRow.className = "d-none d-sm-table-row";
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
      row.setAttribute("id", product.id);

      const cellImage = document.createElement("td");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      image.style.width = "10rem";
      image.style.height = "auto";
      image.className = "img-fluid w-30"
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

      // Calculamos el subtotal de acuerdo a la cantidad de productos, el valor unitario y lo expresamos en dolares.
      const subtotal = document.createElement("td");
      if (product.currency === "UYU") {
        const subtotalUSD = (product.unitCost / 40) * product.count;
        subtotal.textContent = `USD ${subtotalUSD.toFixed(2)}`;
      } else {
        const subtotalUSD = product.unitCost * product.count;
        subtotal.textContent = `USD ${subtotalUSD.toFixed(2)}`;
      }
      

      row.appendChild(cellImage);
      row.appendChild(name);
      row.appendChild(currency);
      row.appendChild(cost);
      row.appendChild(cellQuantity);
      row.appendChild(subtotal);

      tbody.appendChild(row);

      
     // Controlador de eventos input para que se modifique el subtotal según el valor ingresado en la cantidad
inputQuantity.addEventListener("input", () => {
  const newQuantity = parseInt(inputQuantity.value, 10);
  if (!isNaN(newQuantity)) {
    let newSubtotalUSD = 0;

    if (product.currency === "UYU") {
      newSubtotalUSD = (product.unitCost / 40) * newQuantity;
    } else {
      newSubtotalUSD = product.unitCost * newQuantity;
    }

    // Obtenemos el valor actual del subtotal desde el elemento HTML
    const currentSubtotal = parseFloat(subtotal.textContent.replace('USD ', ''));

    // Restamos el valor anterior y sumamos el nuevo subtotal
    subtotalUSD = subtotalUSD - currentSubtotal + newSubtotalUSD;

    // Actualizamos con los nuevos valores en dólares
    subtotal.textContent = `USD ${newSubtotalUSD.toFixed(2)}`;
    subtotalElement.textContent = `USD ${subtotalUSD.toFixed(2)}`;

    updateTotalYEnvio();
  }
});


    });

    table.appendChild(tbody);


    const cartContainer = document.getElementById("cartContainer");
    cartContainer.className = "table-responsive"
    cartContainer.appendChild(table);
  } else {

    // Si no hay productos en el carrito, mostrar un mensaje
    const cartContainer = document.getElementById("cartContainer");
    const message = document.createElement("p");
    message.textContent = "El carrito está vacío.";
    cartContainer.appendChild(message);
  }

  // Calculamos el subtotal en USD
  let subtotalUSD = calcSubtotalUSD(cartData);

  // Insertamos ese subtotal en la celda correspondiente
  const subtotalElement = document.getElementById("subtotales");
  subtotalElement.textContent = `USD ${subtotalUSD.toFixed(2)}`;


  // Insertamos el costo de envio en la celda correspondiente.
  const envioElement = document.getElementById("envio");
  const totalElement = document.getElementById("total");
  const tipoEnvioElements = document.getElementsByName("tipoEnvio");

  //Función que calcula el costo de envío según el tipo seleccionado 
  function updateTotalYEnvio() {
    let totalUSD = subtotalUSD;
    let costoEnvio = 0;

    for (const tipoEnvioElement of tipoEnvioElements) {
      if (tipoEnvioElement.checked) {
        const tipoEnvio = tipoEnvioElement.value;
        if (tipoEnvio === "premium") {
          costoEnvio = totalUSD * 0.15;
        } else if (tipoEnvio === "express") {
          costoEnvio = totalUSD * 0.07;
        } else if (tipoEnvio === "standard") {
          costoEnvio = totalUSD * 0.05;
        }
      }
    }

    totalUSD += costoEnvio;

    envioElement.textContent = `USD ${costoEnvio.toFixed(2)}`;
    totalElement.textContent = `USD ${totalUSD.toFixed(2)}`;
  }

  // Controlador de eventos para que al seleccionar un tipo de envío se llame a la función y haga el cambio correspondiente.
  for (const tipoEnvioElement of tipoEnvioElements) {
    tipoEnvioElement.addEventListener("change", updateTotalYEnvio);
  }

  // Actualiza los totales.
  updateTotalYEnvio();
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
    showCartItems(cartData);
  })
  .catch(error => {
    console.error("Error al obtener el carrito de compras:", error);
  });

//Función para calcular y sumar los subtotales de todos los productos del carrito en dólares.
function calcSubtotalUSD(cartData) {
  let subtotalUSD = 0;

  cartData.articles.forEach(product => {
    if (product.currency === "UYU") {
      subtotalUSD += product.unitCost / 40 * product.count;
    } else {
      subtotalUSD += product.unitCost * product.count;
    }
  });

  return subtotalUSD;
}

//Comportamiento del modal

const credit = document.getElementById("creditCheck");
const cardCredit = document.getElementById("creditNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const transfer = document.getElementById("transfer");
const account = document.getElementById("accountNumber");

//Lógica del modal a través de controladores de eventos
credit.addEventListener("click", () => {
  if (credit.checked) {
    transfer.checked = false;
    account.setAttribute("disabled", "disabled");
    cardCredit.removeAttribute("disabled");
    securityCode.removeAttribute("disabled");
    expiration.removeAttribute("disabled");
    
  } else {
    account.removeAttribute("disabled");
    cardCredit.setAttribute("disabled", "disabled");
    securityCode.setAttribute("disabled", "disabled");
    expiration.setAttribute("disabled", "disabled");
    
  }
});

transfer.addEventListener("click", () => {
  if (transfer.checked) {
    credit.checked = false;
    cardCredit.setAttribute("disabled", "disabled");
    securityCode.setAttribute("disabled", "disabled");
    expiration.setAttribute("disabled", "disabled");
    account.removeAttribute("disabled");
   
  } else {
    cardCredit.removeAttribute("disabled");
    securityCode.removeAttribute("disabled");
    expiration.removeAttribute("disabled");
    account.setAttribute("disabled", "disabled");
    
  }
});













