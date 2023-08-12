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

const email= sessionStorage.getItem('email');
const password= sessionStorage.getItem('password');
window.onload = function() {
    if(email === null && password===null)
      window.location.href = "login.html";
    console.log(email, password);
  }
 