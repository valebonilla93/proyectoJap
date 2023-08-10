const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const container = document.getElementById("container");

function showData(dataArray, categoryName) {
  const titulo = document.createElement("h1");
  titulo.textContent = "Productos";
  const subtitulo = document.createElement("p");
  subtitulo.textContent = `Verás aquí todos los productos de la categoría ${categoryName}`;
  
  container.appendChild(titulo);
  container.appendChild(subtitulo);

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (const item of dataArray) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" style="max-width: 300px;"></td>
      <td>
        <p>${item.name} - ${item.currency} ${item.cost} </p>
        <p>${item.description}</p>
      </td>
      <td>${item.soldCount}</td>
    `;
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}


  fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => showData(data.products, data.catName))