const catId = localStorage.getItem('catID');
const DATA_URL = PRODUCTS_URL + catId + EXT_TYPE;
const container = document.getElementById("container");
const sortAscending = document.getElementById("sortAsc");
const sortDescending = document.getElementById("sortDesc");
const sortByCount = document.getElementById("sortByCount");
const priceMin = document.getElementById("rangeFilterCountMin");
const priceMax = document.getElementById("rangeFilterCountMax");
const filterButton = document.getElementById("rangeFilterCount");
const clearButton = document.getElementById("clearRangeFilter");
const searchInput = document.getElementById("search");
let dataArray = [];
let categoryName;
let filteredData = [];

// Función que agrega el contenido del JSON al HTML para mostrarlo
function showData(dataArray, categoryName) {
  container.innerHTML = '';
  // En caso de no encontrar resultados en la búsqueda, muestra este mensaje.
  if (dataArray.length === 0) {
    const result = document.createElement("p");
    result.innerHTML = 'No se encontraron resultados para tu búsqueda. Asegúrate de que todas las palabras estén escritas correctamente.';
    container.appendChild(result);
    return;
  }
  const title = document.createElement("h1");
  title.textContent = "Productos";
  const subtitle = document.createElement("h3");
  subtitle.innerHTML = `Aquí verás todos los productos de la categoría <em>${categoryName}</em>.`;

  container.appendChild(title);
  container.appendChild(subtitle);

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (const item of dataArray) {
    const row = document.createElement("tr");
    // Agrega un atributo id a cada fila creada en el bucle en products.html.
    row.setAttribute("id", item.id);
    row.innerHTML = `
      <td class="image"><img src="${item.image}" alt="${item.name}" style="max-width: 300px;"></td>
    
      <td class="rowText">
        <p class="productTitle">${item.name} - ${item.currency} ${item.cost} </p>
        <p>${item.description}</p>
      </td>
      <td class="rowText">${item.soldCount} vendidos </td>
    `;
    tbody.appendChild(row);
    // Agrega un controlador de eventos que redirige a product-info cuando se hace clic en una fila.
    row.addEventListener("click", () => {
      // Almacena el id de la fila, es decir, el producto, en el almacenamiento local.
      const productId = item.id;
      localStorage.setItem("selectedProductId", productId);
      window.location.href = "product-info.html";
    });
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

// Función que ordena los productos en orden ascendente por su valor.
sortAscending.addEventListener("click", () => {
  dataArray.sort((a, b) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});

// Función que ordena los productos en orden descendente por su valor.
sortDescending.addEventListener("click", () => {
  dataArray.sort((b, a) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});

// Función que ordena los productos en orden descendente por la cantidad vendida.
sortByCount.addEventListener("click", () => {
  dataArray.sort((b, a) => a.soldCount - b.soldCount);
  showData(dataArray, categoryName); 
});

// Función que filtra los productos en función de los precios mínimo y máximo ingresados en los campos correspondientes.
filterButton.addEventListener("click", () => {
  filteredData = dataArray.filter(item => item.cost >= priceMin.value && item.cost <= priceMax.value);
  showData(filteredData, categoryName);
});

// Función que borra los filtros aplicados anteriormente.
clearButton.addEventListener("click", () => {
  filteredData = [];
  priceMin.value = "";
  priceMax.value = "";
  showData(dataArray, categoryName);
});

// Búsqueda de productos en tiempo real
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const searchResults = dataArray.filter(item => {
    const name = item.name.toLowerCase();
    const description = item.description.toLowerCase();
    return name.includes(searchValue) || description.includes(searchValue);
  });
  showData(searchResults, categoryName);
});

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
    dataArray = data.products;
    categoryName = data.catName;
    showData(dataArray, data.catName);
  });
  window.onload = function() {
    showEmailInNavbar()
    }
