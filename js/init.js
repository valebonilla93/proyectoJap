const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
function showEmailInNavbar (){
const email = localStorage.getItem('email');
  if(email){
    document.getElementById('email').textContent = email;
}
}
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que cambia el valor del atributo dataset-bs-theme del html entre light y dark según la selección del usuario. Esta función se llamará desde todos los js.
function modeDark() {
  const darkModeButton = document.getElementById("darkMode");
  const htmlElement = document.getElementById("htmlElement");
  const actualTheme = localStorage.getItem("theme");

  if (actualTheme) {
    htmlElement.dataset.bsTheme = actualTheme;
  }

  darkModeButton.addEventListener("click", () => {
    if (htmlElement.dataset.bsTheme === "light") {
      htmlElement.dataset.bsTheme = "dark";
    } else {
      htmlElement.dataset.bsTheme = "light";
    }

    localStorage.setItem("theme", htmlElement.dataset.bsTheme);
  });
}




