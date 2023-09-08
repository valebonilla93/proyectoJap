function showEmailNavBar (){
const email = localStorage.getItem('email');
  if(email){
    document.getElementById('email').textContent = email;
}
}
