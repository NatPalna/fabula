document.querySelector(".burger_menu").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("active");
  document.querySelector(".nav_items").classList.toggle("active");
});
