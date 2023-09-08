const selectedProductId = localStorage.getItem("selectedProductId");
const url = PRODUCT_INFO_URL + selectedProductId + EXT_TYPE;
const container = document.getElementById('container');
const urlComent = PRODUCT_INFO_COMMENTS_URL + selectedProductId + EXT_TYPE;
const containerComent = document.getElementById('containerComentarios');
let dataArray = [];
let dataArrayComent = [];

//Función que ordena la información traída de product info.
function showDataInfo(dataArray) {
    container.innerHTML = "";

    const title = document.createElement('h3');
    title.innerHTML = `${dataArray.name}`;
    container.appendChild(title);

    const hr = document.createElement('hr');
    container.appendChild(hr);

    const cost = document.createElement('p');
    cost.innerHTML = `<strong> Precio </strong> <br> ${dataArray.currency} ${dataArray.cost}`;
    container.appendChild(cost);

    const description = document.createElement('p');
    description.innerHTML = `<strong> Descripción </strong> <br> ${dataArray.description}`;
    container.appendChild(description);

    const category = document.createElement('p');
    category.innerHTML = `<strong> Categoría</strong> <br> ${dataArray.category}`;
    container.appendChild(category);

    const sold = document.createElement('p');
    sold.innerHTML = `<strong>Cantidad de vendidos</strong> <br> ${dataArray.soldCount}`;
    container.appendChild(sold);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('d-flex');
    imgContainer.innerHTML = `<strong> Imágenes ilustrativas</strong> <br>`;
    container.appendChild(imgContainer);

    // Como hay varias imágenes en el json utilizamos un for para traerlas a todas.
    for (const image of dataArray.images) {
        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.style.width = '20%';
        img.style.height = 'auto';
        img.classList.add('d-inline-block', 'mx-2');
        imgContainer.appendChild(img);
    }

    container.appendChild(imgContainer);

}

//Función que trae los comentarios de product info comments.
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

// Fetch al json con la información de los productos.
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        dataArray = data;
        showDataInfo(dataArray);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });;

    // Fetch al json con los comentarios de los productos.

fetch(urlComent)
    .then((response) => response.json())
    .then((dataDos) => {
        dataArrayComent = dataDos;
        showDataComent(dataArrayComent);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });;