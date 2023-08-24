const catId = localStorage.getItem('catID');
const DATA_URL = PRODUCTS_URL + catId + EXT_TYPE;
const container = document.getElementById("container");
const mayorAMenor = document.getElementById("sortAsc");
const menorAMayor = document.getElementById("sortDesc");
const rel = document.getElementById("sortByCount");
let dataArray = [];
let categoryName;

function showData(dataArray, categoryName) {
  container.innerHTML = '';
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

menorAMayor.addEventListener("click", () => {
  dataArray.sort((a, b) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});

mayorAMenor.addEventListener("click", () => {
  dataArray.sort((b, a) => a.cost - b.cost);
  showData(dataArray, categoryName); 
});

rel.addEventListener("click", () => {
  dataArray.sort((b, a) => a.soldCount - b.soldCount);
  showData(dataArray, categoryName); 
});


fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
      dataArray = data.products;
      categoryName = data.catName;
      showData(dataArray, data.catName);
  });

 