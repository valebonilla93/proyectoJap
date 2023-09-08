const selectedProductId = localStorage.getItem("selectedProductId");
const url = PRODUCT_INFO_URL + selectedProductId + EXT_TYPE;
const container = document.getElementById('container');
const urlComment = PRODUCT_INFO_COMMENTS_URL + selectedProductId + EXT_TYPE;
const containerComment = document.getElementById('containerComentarios');
const commentBtn = document.getElementById("comentBtn");
const commentInput = document.getElementById("comentario");
const email = localStorage.getItem('email');
let dataArray = [];
let dataArrayComment = [];

// Función que ordena la información traída de product info.
function showDataInfo(dataArray) {
    container.innerHTML = "";

    // ... (resto del código para mostrar la información del producto)
}

// Función que muestra los comentarios
function showComments(dataArrayComment) {
    containerComment.innerHTML = '';
    // ... (resto del código para mostrar los comentarios)
}

// Función para cargar datos del producto
function loadProductData() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            dataArray = data;
            showDataInfo(dataArray);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
}

// Función para cargar comentarios
function loadComments() {
    fetch(urlComment)
        .then((response) => response.json())
        .then((data) => {
            dataArrayComment = data;
            showComments(dataArrayComment);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
}

// Muestra el email del usuario en la barra de navegación.
window.onload = function () {
    showEmailInNavbar()
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
    dataArrayComment.push(newComment);

    // Guardar el arreglo actualizado en el Local Storage.
    localStorage.setItem("comentarios", JSON.stringify(dataArrayComment));

    // Llamar a la función showComments para mostrar los comentarios actualizados en la página.
    showComments(dataArrayComment);

    // Limpiar el campo de comentario después de agregarlo.
    commentInput.value = "";
});

// Cargar datos del producto y comentarios al cargar la página.
loadProductData();
loadComments();

// Se obtiene los comentarios almacenados en el localStorage y los agrega a través de la función showComments al dataArrayComment
if (!dataArrayComment || dataArrayComment.length === 0) {
    const commentSave = localStorage.getItem("comentarios");
    if (commentSave) {
        dataArrayComment = JSON.parse(commentSave);
        showComments(dataArrayComment);
    }
}
