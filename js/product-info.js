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
    const titleContainer = document.createElement('div');
    titleContainer.className = 'd-flex justify-content-between align-items-center mb-2';

    const title = document.createElement('h1');
    title.innerHTML = `${dataArray.name}`;

    //Se agrega el botón para agregar el producto al carrito del cliente.
    const buy = document.createElement('button');
    buy.className = 'btn btn-success';
    buy.textContent = 'Agregar al carrito';

// Controlador de eventos que define lo que sucederá al clickear el botón buy: se agregará el producto al localStorage para ser usado en cart.js
buy.addEventListener("click", function () {
    const addProduct = {
        // Utilizamos el id ya guardado previamente en el localStorage.
        id: selectedProductId,
        name: dataArray.name,
        currency: dataArray.currency,
        unitCost: dataArray.cost,
        count: 1,
        image: dataArray.images[0]
    };

    // Creamos una constante para guardar el carrito actual desde el localStorage o crear uno nuevo si no existiese.
    const actualCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Usamos un condicional, si el producto ya está en el carrito se modifica su cantidad en 1, si no lo agregamos.
    const existingProduct = actualCart.findIndex(product => product.id === addProduct.id);

    if (existingProduct !== -1) {
        actualCart[existingProduct].count++;
    } else {
        actualCart.push(addProduct);
    }

    //localStorage solo nos permite guardar strings por eso es necesario usar json.stringify para convertir nuestro objeto.
    localStorage.setItem("cart", JSON.stringify(actualCart));
    
    //Agregamos una alerta para que se avise que el producto se agregó con éxito al carrito.
    alert("El producto ha sido agregado a su carrito.")

});



    titleContainer.appendChild(title);
    titleContainer.appendChild(buy);

    container.appendChild(titleContainer);


    const cost = document.createElement('p');
    cost.innerHTML = `<strong>Precio</strong> <br> ${dataArray.currency} ${dataArray.cost}`;
    container.appendChild(cost);
    const description = document.createElement('p');
    description.innerHTML = `<strong>Descripción</strong> <br> ${dataArray.description}`;
    container.appendChild(description);
    const category = document.createElement('p');
    category.innerHTML = `<strong>Categoría</strong> <br> ${dataArray.category}`;
    container.appendChild(category);
    const sold = document.createElement('p');
    sold.innerHTML = `<strong>Cantidad de vendidos</strong> <br> ${dataArray.soldCount}`;
    container.appendChild(sold);

    const imgContainer = document.createElement('div');
    imgContainer.innerHTML = `<strong>Imágenes ilustrativas</strong> <br>`;
    container.appendChild(imgContainer);


    // CAROUSEL

    function loadCarouselImages(images) {
        // función para cargar imágenes en el carrusel, seleccionamos el el elemento del carrusel y su contenedor interno
        const myCarousel = document.querySelector('#myCarousel');
        const carouselInner = myCarousel.querySelector('.carousel-inner');

        // eliminar cualquier contenido previo del carrusel para evitar duplicados
        carouselInner.innerHTML = '';

        // recorremos las imágenes y crea elementos del carrusel para cada una de las imagenes
        images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            // establece la primera imagen como activa
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            // crear el elemento de imagen
            const img = document.createElement('img');
            img.src = image;
            img.classList.add('d-block', 'w-100');
            img.alt = `Slide ${index + 1}`;

            // agregamos la imagen al elemento de carrusel
            carouselItem.appendChild(img);

            // agregamos el elemento de carrusel al contenedor interno
            carouselInner.appendChild(carouselItem);
        });
    }

    // llamamos a la función para cargar las imágenes en el carrusel
    loadCarouselImages(dataArray.images);

    // fin del código del carrusel


    container.appendChild(imgContainer);

    const relatedProductsContainer = document.getElementById('relatedProductsContainer');


    const titleRelated = document.createElement('h3');
    titleRelated.innerHTML = `Productos relacionados`;
    relatedProductsTitle.appendChild(titleRelated);

    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'justify-content-center', 'container-x3');




    relatedProductsContainer.appendChild(rowContainer);

    for (const relatedProduct of dataArray.relatedProducts) {
        const colProductRelated = document.createElement('div');
        colProductRelated.classList.add('col-lg-6',);

        const divProductRelated = document.createElement('div');
        divProductRelated.classList.add('card');
        divProductRelated.setAttribute("id", relatedProduct.id);
        relatedProductsContainer.appendChild(divProductRelated);
        const imgRelated = document.createElement('img');
        imgRelated.setAttribute('src', relatedProduct.image);
        imgRelated.setAttribute("id", relatedProduct.id);
        imgRelated.classList.add("card-img-top");
        relatedProductsContainer.appendChild(imgRelated);
        const divRelated = document.createElement('div');
        divRelated.classList.add("card-body");
        const nameRelated = document.createElement('p');
        nameRelated.setAttribute("id", relatedProduct.id);
        nameRelated.classList.add("card-text");
        nameRelated.innerHTML = relatedProduct.name;
        nameRelated.style.fontSize = '15px';
        relatedProductsContainer.appendChild(nameRelated);

        nameRelated.addEventListener("click", () => {
            // Almacena el id de la fila, es decir, el producto, en el almacenamiento local.
            const productId = relatedProduct.id;
            localStorage.setItem("selectedProductId", productId);
            window.location.href = "product-info.html";
        });

        imgRelated.addEventListener("click", () => {
            // Almacena el id de la fila, es decir, el producto, en el almacenamiento local.
            const productId = relatedProduct.id;
            localStorage.setItem("selectedProductId", productId);
            window.location.href = "product-info.html";
        });

        // Agrega los elementos a la tarjeta y la columna
        divProductRelated.appendChild(imgRelated);
        divProductRelated.appendChild(divRelated);
        divRelated.appendChild(nameRelated);
        colProductRelated.appendChild(divProductRelated);

        // Agrega la columna a la fila
        rowContainer.appendChild(colProductRelated);


    }



}




// Función que muestra los comentarios
function showComments(dataArrayComment) {
    containerComment.innerHTML = '';
    containerComment.innerHTML = '';
    const title = document.createElement('h2');
    const table = document.createElement('table');
    table.classList.add('comment-table');
    const tbody = document.createElement('tbody');
    title.textContent = 'Comentarios';
    title.style.paddingTop = '1%';
    containerComment.appendChild(title);

    //Ordena los comentarios mostrando primero los últimos realizados.
    dataArrayComment.sort((a, b) => {
        const dateA = new Date(a.dateTime);
        const dateB = new Date(b.dateTime);
        return dateB - dateA;
    });

    //Se muestra el score en formato de estrellas.
    for (const item of dataArrayComment) {
        const row = document.createElement('tr');
        const starRating = '&#9733;'.repeat(Math.round(item.score));
        const emptyStars = '&#9734;'.repeat(5 - Math.round(item.score));

        row.innerHTML = `
            <td>
                <p><strong>${item.user} </strong>- ${item.dateTime} <span style="color: orange;">${starRating}</span><span style="color: black;">${emptyStars}</p>
                <p>${item.description}</p>
            </td>
        `;
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    containerComment.appendChild(table);
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

function loadComments() {
    fetch(urlComment)
        .then((response) => response.json())
        .then((data) => {
            // Filtra los comentarios solo para el producto seleccionado
            dataArrayComment = data.filter(comment => comment.product === parseInt(selectedProductId));

            const localComments = JSON.parse(localStorage.getItem(`comentarios_${selectedProductId}`)) || [];
            // Combinar comentarios del JSON externo y los locales
            dataArrayComment = mergeComments(dataArrayComment, localComments);
            showComments(dataArrayComment);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
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
        description: commentText,
        productId: selectedProductId
    };

    // Agregar el nuevo comentario al arreglo de comentarios existentes.
    dataArrayComment.push(newComment);

    // Guardar el arreglo actualizado en el Local Storage.
    localStorage.setItem(`comentarios_${selectedProductId}`, JSON.stringify(dataArrayComment));
    // Llamar a la función showComments para mostrar los comentarios actualizados en la página.
    showComments(dataArrayComment);

    // Limpiar el campo de comentario después de agregarlo.
    commentInput.value = "";
});

// Cargar datos del producto y comentarios al cargar la página.
loadProductData();
loadComments();

// Se obtiene los comentarios almacenados en el localStorage y los agrega a través de la función showComments al dataArrayComment
window.onload = function () {
    showEmailInNavbar();
}

// Función para combinar comentarios sin duplicados
function mergeComments(array1, array2) {
    const uniqueComments = new Map();

    // Agregar comentarios del array1 al mapa
    array1.forEach((comment) => {
        uniqueComments.set(comment.dateTime, comment);
    });

    // Agregar comentarios del array2 al mapa, sobrescribiendo los duplicados
    array2.forEach((comment) => {
        uniqueComments.set(comment.dateTime, comment);
    });

    // Convertir el mapa nuevamente en un arreglo de comentarios
    return Array.from(uniqueComments.values());
}

document.addEventListener("DOMContentLoaded", function () {
    modeDark();
});








