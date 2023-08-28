const catId = localStorage.getItem('catID');
const DATA_URL = PRODUCTS_URL + catId + EXT_TYPE;
const container = document.getElementById("container");
const mayorAMenor = document.getElementById("sortAsc");
const menorAMayor = document.getElementById("sortDesc");
const rel = document.getElementById("sortByCount");
const precioMin = document.getElementById("rangeFilterCountMin");
const precioMax = document.getElementById("rangeFilterCountMax");
const botonFiltrar = document.getElementById("rangeFilterCount");
const botonLimpiar = document.getElementById("clearRangeFilter");
const buscador = document.getElementById("search");
let dataArray = [];
let categoryName;
let filtrados = [];

// Función que agrega al html el contenido a mostrar traido desde el JSON
function showData(dataArray, categoryName) {
  container.innerHTML = '';
  // En el caso de no encontrar resultados en la b[usqueda se mostrará este mensaje.
  if (dataArray.length === 0){
    const resultado = document.createElement("p");
    resultado.innerHTML = 'No se han encontrado resultados para tu búsqueda. Asegúrate de que todas las palabras estén escritas correctamente.';
    container.appendChild(resultado);
    return;
  }
  const titulo = document.createElement("h1");
  titulo.textContent = "Productos";
  const subtitulo = document.createElement("h3");
  subtitulo.innerHTML = `Verás aquí todos los productos de la categoría <em>${categoryName}</em>`;


  container.appendChild(titulo);
  container.appendChild(subtitulo);

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (const item of dataArray) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="imagen"><img src="${item.image}" alt="${item.name}" style="max-width: 300px;"></td>
    
      <td class="textoFilas">
        <p class="productoTitulo" >${item.name} - ${item.currency} ${item.cost} </p>
        <p>${item.description}</p>
      </td>
      <td class="textoFilas">${item.soldCount} vendidos </td>
      
  
    `;
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

//Función que ordena de forma ascendente los productos según su valor.
menorAMayor.addEventListener("click", () => {
  dataArray.sort((a, b) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});

//Función que ordena de forma descendente los productos según su valor.
mayorAMenor.addEventListener("click", () => {
  dataArray.sort((b, a) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});
//Función que ordena de forma descendente los productos según la cantidad de vendidos.
rel.addEventListener("click", () => {
  dataArray.sort((b, a) => a.soldCount - b.soldCount);
  showData(dataArray, categoryName); 
});

// Función que filtra los productos de acuerdo a precios mínimos y máximos indicados en los campos correspondientes.
botonFiltrar.addEventListener("click", () => {
    filtrados = dataArray.filter(item => item.cost >= precioMin.value && item.cost <= precioMax.value);
    showData(filtrados, categoryName);
})

// Función que limpia los filtros aplicados anteriormente.
botonLimpiar.addEventListener("click", () => {
  filtrados = [];
  precioMin.value = "";
  precioMax.value = "";
  showData(dataArray, categoryName);
})
// Buscador en tiempo real de productos
buscador.addEventListener('input', () => {
  const valorBuscador = buscador.value.toLowerCase();
  const arrayBuscador = dataArray.filter(item => {
    const nombre = item.name.toLowerCase();
    const descripcion = item.description.toLowerCase();
    return nombre.includes(valorBuscador) || descripcion.includes(valorBuscador);

  })
  showData(arrayBuscador, categoryName);
} )

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
      dataArray = data.products;
      categoryName = data.catName;
      showData(dataArray, data.catName);
  });

 
 