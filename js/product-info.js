const selectedProductId = localStorage.getItem("selectedProductId");
const url = PRODUCT_INFO_URL + selectedProductId + EXT_TYPE;
const container = document.getElementById('container');
const urlComment = PRODUCT_INFO_COMMENTS_URL + selectedProductId + EXT_TYPE;
const containerComment = document.getElementById('containerComentarios');
const commentBtn = document.getElementById("comentBtn");
const commentInput = document.getElementById("comentario");
const email = localStorage.getItem('email');
let dataArray = [];
let dataArrayCommentApi = [];
let dataArrayCommentUser = [];

//Función que ordena la información traída de product info.
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
    imgContainer.innerHTML = `Imágenes ilustrativas <br>`;
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
function showDataComment(dataArrayComment) {
    containerComment.innerHTML = '';
    const title = document.createElement('h3');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    title.textContent = 'Comentarios';
    containerComment.appendChild(title);
    
    //Ordena los comentarios mostrando primero los últimos realizados.
    dataArrayComment.sort((a,b)=> {
const dateA = new Date (a.dateTime);
const dateB = new Date (b.dateTime);
return dateB - dateA;
});

//Se muestra el score en formato de estrellas.
for (const item of dataArrayComment) {
    const row = document.createElement('tr');
    const starRating = '&#9733;'.repeat(Math.round(item.score));
    const emptyStars = '&#9734;'.repeat(5 - Math.round(item.score));

    row.innerHTML = `
        <td>
            <p>${item.user} - ${item.dateTime} - <span style="color: orange;">${starRating}</span><span style="color: black;">${emptyStars}</span></p>
            <p>${item.description}</p>
        </td>
    `;


        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    containerComment.appendChild(table);
}

// Muestra el email del usuario en la barra de navegación.
 window.onload = function() {
    showEmailInNavbar()
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

    // Se obtiene los comentarios almacenados en el localStorage y los agrega a traves de la función ShowDataComment al dataArrayComment
    const commentSave = localStorage.getItem("comentarios");
    if (commentSave){
        dataArrayComment = JSON.parse(commentSave);
        showDataComment(dataArrayComment);
    }

// Agregar un evento al botón "Enviar" para manejar el proceso de agregar comentarios.
commentBtn.addEventListener("click", function () {
    // Obtener el contenido del comentario y la puntuación del usuario.
    const commentText = commentInput.value;
    const puntuacion = document.getElementById("puntuacion").value;

    // Crear un nuevo objeto de comentario con la información proporcionada por el usuario.

    const newComment = {
        user: email, 
        dateTime: new Date().toLocaleString(),
        score: puntuacion,
        description: commentText
    };

    // Agregar el nuevo comentario al arreglo de comentarios existentes.
    dataArrayCommentUser.push(newComment);

    // Guardar el arreglo actualizado en el Local Storage.
    localStorage.setItem("comentarios", JSON.stringify(dataArrayComment));

    // Llamar a la función showDataComent para mostrar los comentarios actualizados en la página.
    showDataComment(dataArrayCommentUser);

    // Limpiar el campo de comentario después de agregarlo.
    commentInput.value = "";
});
// Fetch al json con los comentarios de los productos.

fetch(urlComment)
    .then((response) => response.json())
    .then((dataDos) => {
        dataArrayCommentApi = dataDos;
        dataArrayComment = dataArrayCommentApi.concat(dataArrayCommentUser);
        showDataComment(dataArrayComment);
        localStorage.setItem("comentarios", JSON.stringify(dataArrayComment));
    })
    .catch((error) => {
        console.error('Fetch error:', error);
});;