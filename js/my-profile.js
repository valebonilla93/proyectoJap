const email = localStorage.getItem('email');
const password = localStorage.getItem('password');

//Al cargar la página si el usuario no está logueado lo redirige a login.html
window.onload = function () {
  if (email === null || password === null) {
    window.location.href = "login.html";
  } else {
    showEmailInNavbar()
    firstName.value = localStorage.getItem('firstName');
    lastName.value = localStorage.getItem('lastName');
    secondName.value = localStorage.getItem('secondName');
    secondLastName.value = localStorage.getItem('secondLastName');
    tel.value = localStorage.getItem('tel');
  }
  console.log(email, password);
}

// Llamado a la función del modo oscuro
document.addEventListener("DOMContentLoaded", function () {
  modeDark();
});

// En el campo de email se guarda el valor de email guardado en el almacenamiento local.
const inputEmail = document.getElementById("inputEmail");
inputEmail.value = email;


const save = document.getElementById("save");
const firstName = document.getElementById("inputName");
const lastName = document.getElementById("inputLastName");
const secondName = document.getElementById("inputName2");
const secondLastName = document.getElementById("inputLastName2");
const tel = document.getElementById("inputTel");

// Creamos un controlador de eventos que al clickear el botón "Guardar cambios" se verifique que no hayan campos obligatorios vacíos y se guarden los datos ingresados en el localStorage.
save.addEventListener("click", () => {
  if (firstName.value === null || lastName.value === null || inputEmail.value === null) {
  } else {
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('lastName', lastName.value);
    localStorage.setItem('secondName', secondName.value);
    localStorage.setItem('secondLastName', secondLastName.value);
    localStorage.setItem('tel', tel.value);
  }
})

