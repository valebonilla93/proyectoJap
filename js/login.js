
const checkbox = document.getElementById('mostrarPass');
const password = document.getElementById('password');
const email = document.getElementById('email');
const button = document.getElementById('submit');

checkbox.addEventListener('click', () => {
    if (password.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
    
});

button.addEventListener('click', () => {
    const data = {
        email: email.value,
        password: password.value
    };
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value); 
    console.log(data);
});



