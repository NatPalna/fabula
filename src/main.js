// бургер-меню
document.querySelector(".burger_menu").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("active");
  document.querySelector(".nav_items").classList.toggle("active");
});

// валидация формы
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // проверка имени
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (name.value.trim() === "") {
      name.classList.add("invalid");
      nameError.classList.add("active");
      isValid = false;
    }

    // проверка телефона
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    // Удаляем все нецифровые символы и проверяем длину
    const phoneDigits = phone.value.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      phone.classList.add("invalid");
      phoneError.classList.add("active");
      isValid = false;
    } else {
      phone.classList.remove("invalid");
      phoneError.classList.remove("active");
    }

    // проверка согласия
    const agreement = document.getElementById("agreement_top");
    const agreeError = document.getElementById("agreeError");
    if (!agreement.checked) {
      agreement.classList.add("invalid");
      agreeError.classList.add("active");
      isValid = false;
    }

    if (isValid) {
      // this.submit();
      showSuccessModal();
    }
  });

// Маска для телефона
document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    // Форматирование: +7 (XXX) XXX-XX-XX
    let formattedValue = "+7 (";
    if (value.length > 1) {
      formattedValue += value.substring(1, 4);
    }
    if (value.length >= 4) {
      formattedValue += ") " + value.substring(4, 7);
    }
    if (value.length >= 7) {
      formattedValue += "-" + value.substring(7, 9);
    }
    if (value.length >= 9) {
      formattedValue += "-" + value.substring(9, 11);
    }
    e.target.value = formattedValue;
  }
});

// модальное окно
function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("active");

  // сброс формы
  document.getElementById("reservationForm").reset();
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("active");
}

// закрыть по клику на крестик
document
  .querySelector(".modal_close")
  .addEventListener("click", closeSuccessModal);

// закрыть по клику вне модального окна
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeSuccessModal();
  }
});

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSuccessModal();
  }
});
