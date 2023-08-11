const checkbox = document.getElementById('mostrarPass');
const password = document.getElementById('password');
const email = document.getElementById('email')
const button = document.getElementById('button')

checkbox.addEventListener('click', () => {
    if (password.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
    console.log(data)
});

button.addEventListener('click', (evento) => {
    evento.preventDefault()
    const data = {
        email: email.value,
        password: password.value
    }
    console.log(data)
})


