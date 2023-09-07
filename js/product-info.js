const selectedProductId = localStorage.getItem("selectedProductId");
const url = PRODUCT_INFO_URL + selectedProductId + EXT_TYPE;
const container = document.getElementById('container');
const urlComent = PRODUCT_INFO_COMMENTS_URL + selectedProductId + EXT_TYPE;
const containerComent = document.getElementById('containerComentarios');
let dataArray = [];
let dataArrayComent = [];

function showDataInfo(dataArray) {
    container.innerHTML = "";

    const title = document.createElement('h3');
    title.innerHTML = `${dataArray.name}`;
    container.appendChild(title);

    const cost = document.createElement('p');
    cost.innerHTML = `Precio <br> ${dataArray.currency} ${dataArray.cost}`;
    container.appendChild(cost);

    const description = document.createElement('p');
    description.innerHTML = `Descripción <br> ${dataArray.description}`;
    container.appendChild(description);

    const category = document.createElement('p');
    category.innerHTML = `Categoría <br> ${dataArray.category}`;
    container.appendChild(category);

    const sold = document.createElement('p');
    sold.innerHTML = `Cantidad de vendidos <br> ${dataArray.soldCount}`;
    container.appendChild(sold);

    const imgContainer = document.createElement('div');
    imgContainer.innerHTML = `imagenes ilustrativas <br>`;
    container.appendChild(imgContainer);

    for (const image of dataArray.images) {
        const img = document.createElement('img');
        img.setAttribute('src', image);
        imgContainer.appendChild(img);
    }

    container.appendChild(imgContainer);

}
function showDataComent(dataArrayComent) {
    containerComent.innerHTML = "";
    const title = document.createElement('h3');
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    title.textContent = "Comentarios";
    containerComent.appendChild(title);
    for (const item of dataArrayComent) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
        <p>${item.user} - ${item.dateTime} - ${item.score} </p>
        <p>${item.description}</p>
      </td>
    `;
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    containerComent.appendChild(table);
}
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        dataArray = data;
        showDataInfo(dataArray);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });;

    fetch(urlComent)
    .then((response) => response.json())
    .then((dataDos) => {
        dataArrayComent = dataDos;
        showDataComent(dataArrayComent);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });;