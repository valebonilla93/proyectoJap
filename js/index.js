

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Cambio de session a local y se agregó la información guardada en la constante email a la barra de navegación.
const email = localStorage.getItem('email');
const password = localStorage.getItem('password');
 
window.onload = function() {
    if (email === null || password === null) {
        window.location.href = "login.html";
 } else {
    document.getElementById('email').textContent = email;
 } 
    console.log(email, password);
}



document.addEventListener("DOMContentLoaded", function() {
    modeDark();
  });

 