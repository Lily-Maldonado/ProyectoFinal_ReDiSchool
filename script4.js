/*Script for Contact me button*/
document.addEventListener("DOMContentLoaded", function () {
  const showPhoneButton = document.getElementById("showPhoneButton");
  const phoneNumber = document.getElementById("phoneNumber");

  showPhoneButton.addEventListener("click", function () {
    console.log("Botón presionado");
    phoneNumber.style.display = "block";
  });
});
console.log("El archivo JavaScript se ha cargado correctamente.");
