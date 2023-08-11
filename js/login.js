const checkbox = document.getElementById('mostrarPass');
var password = document.getElementById('password');

checkbox.addEventListener('click', () => {
    if (password.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
});
   