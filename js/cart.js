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
      inputQuantity.type = "number";
      inputQuantity.value = product.count;
      inputQuantity.className = "hidden-input";
      inputQuantity.required = true;
      inputQuantity.min = 1;
      inputQuantity.placeholder = "Mayor a 0"
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

  // Condicional para que si el usuario ingresa 0, cambie a 1.
  let value = parseInt(inputQuantity.value, 10);
  if(value === 0){
    value = 1
    inputQuantity.value = value;
    newQuantity = value;
  }
  
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

// Seleccionamos elementos del modal

const credit = document.getElementById("creditCheck");
const cardCredit = document.getElementById("creditNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const transfer = document.getElementById("transfer");
const account = document.getElementById("accountNumber");
const btnSubmit = document.getElementById("btnFinish");
const street = document.getElementById("calle");
const numberDir = document.getElementById("numero");
const corner = document.getElementById("esquina");
const pay = document.getElementById("pay");
const msgAlert = document.getElementById("alert");
const danger = document.getElementById("danger");

// Controlador de evento para la casilla de verificación de tarjeta de crédito.
credit.addEventListener("click", () => {
  // Si se selecciona tarjeta de crédito, se desactiva la opción de transferencia y se habilitan los campos de tarjeta de crédito
  if (credit.checked) {
    transfer.checked = false;
    pay.classList.remove("is-invalid");
    account.classList.remove("is-invalid");
    account.setAttribute("disabled", "disabled");
    cardCredit.removeAttribute("disabled");
    securityCode.removeAttribute("disabled");
    expiration.removeAttribute("disabled");
   // Si no se selecciona tarjeta de crédito, se habilita el campo de cuenta bancaria y se desactivan los campos de tarjeta de crédito 
  } else {
    account.removeAttribute("disabled");
    cardCredit.setAttribute("disabled", "disabled");
    securityCode.setAttribute("disabled", "disabled");
    expiration.setAttribute("disabled", "disabled");
    
  }
});

// Controlador de evento para la casilla de verificación de transferencia bancaria.
transfer.addEventListener("click", () => {
  if (transfer.checked) {
    // Si se selecciona transferencia bancaria, se desactiva la opción de tarjeta de crédito y se habilitan los campos de transferencia bancaria
    credit.checked = false;
    pay.classList.remove("is-invalid");
    cardCredit.classList.remove("is-invalid");
    securityCode.classList.remove("is-invalid");
    expiration.classList.remove("is-invalid");
    cardCredit.setAttribute("disabled", "disabled");
    securityCode.setAttribute("disabled", "disabled");
    expiration.setAttribute("disabled", "disabled");
    account.removeAttribute("disabled");
   
  } else {
    // Si no se selecciona transferencia bancaria, se habilitan los campos de tarjeta de crédito y se desactiva el campo de cuenta bancaria
    cardCredit.removeAttribute("disabled");
    securityCode.removeAttribute("disabled");
    expiration.removeAttribute("disabled");
    account.setAttribute("disabled", "disabled");
    
  }
});

// Controlador de evento para el botón de envío del formulario
btnSubmit.addEventListener("click", ()=>{
if(street.value == ""){
  street.classList.add("is-invalid");
}else {
  street.classList.remove("is-invalid");
  street.classList.add("is-valid");
};

if(numberDir.value == ""){
  numberDir.classList.add("is-invalid");
}else {
  numberDir.classList.remove("is-invalid");
  numberDir.classList.add("is-valid");
};

if(corner.value == ""){
  corner.classList.add("is-invalid");
}else {
  corner.classList.remove("is-invalid");
  corner.classList.add("is-valid");
};

if(credit.checked || transfer.checked){
  pay.classList.remove("is-invalid");
  pay.classList.add("is-valid");
} else{
  pay.classList.add("is-invalid");
};

if(credit.checked && cardCredit.value == ""){
  cardCredit.classList.add("is-invalid");
} else {
  cardCredit.classList.remove("is-invalid");
};

if(credit.checked && securityCode.value == ""){
  securityCode.classList.add("is-invalid");
} else {
  securityCode.classList.remove("is-invalid");
};

if(credit.checked && expiration.value == ""){
  expiration.classList.add("is-invalid");
} else {
  expiration.classList.remove("is-invalid");
};

if(transfer.checked && account.value == ""){
  account.classList.add("is-invalid");
} else {
  account.classList.remove("is-invalid");
};

// Genera mensajes de alerta según la validación de los campos
if((street.value !== "")&&(numberDir.value !== "")&&(corner.value !== "")&&((credit.checked && cardCredit.value !== "" && securityCode.value !== "" && expiration.value !== "") || (transfer.checked && account.value !== ""))){
  // Muestra un mensaje de alerta verde si todo está válido
  msgAlert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
   ¡Has comprado con éxito!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
} else {
  // Muestra un mensaje de alerta rojo si hay errores en los campos
  danger.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  No se pudo finalizar la compra.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}
});














