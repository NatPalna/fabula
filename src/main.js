// бургер-меню
document.querySelector(".burger_menu").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("active");
  document.querySelector(".nav_items").classList.toggle("active");
});

// валидация формы
// document.addEventListener("DOMContentLoaded", function () {
//   window.validateForm = function (formId) {
//     const form = document.getElementById(formId);

//     // Ошибки
//     const nameInput = form.querySelector("input[id^='name']");
//     const phoneInput = form.querySelector("input[id^='phone']");
//     const agreementCheckbox = form.querySelector("input[type='checkbox']");

//     const nameError = document.getElementById(
//       formId === "reservationForm1" ? "nameError1" : "nameError2"
//     );
//     const phoneError = document.getElementById(
//       formId === "reservationForm1" ? "phoneError1" : "phoneError2"
//     );
//     const agreeError = document.getElementById(
//       formId === "reservationForm1" ? "agreeError1" : "agreeError2"
//     );

//     let isValid = true;

//     // Проверка имени
//     if (!nameInput.value.trim()) {
//       nameError.classList.add("active");
//       isValid = false;
//     } else {
//       nameError.classList.remove("active");
//     }

//     // Проверка телефона qwen
//     // const phoneRegex = /^\+7\s$[0-9]{3}$\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
//     // if (!phoneRegex.test(phoneInput.value)) {
//     //   phoneError.classList.add("active");
//     //   isValid = false;
//     // } else {
//     //   phoneError.classList.remove("active");
//     // }

//     const phone = document.querySelector("input[id^='phone']");
//     // Удаляем все нецифровые символы и проверяем длину
//     const phoneDigits = phoneInput.value.replace(/\D/g, "");
//     if (phoneDigits.length < 10) {
//       phoneInput.classList.add("invalid");
//       phoneError.classList.add("active");
//       isValid = false;
//     } else {
//       phoneInput.classList.remove("invalid");
//       phoneError.classList.remove("active");
//     }

//     // Маска для телефона
//     document
//       .querySelector("input[id^='phone']")
//       .addEventListener("input", function (e) {
//         let value = e.target.value.replace(/\D/g, "");
//         if (value.length > 0) {
//           // Форматирование: +7 (XXX) XXX-XX-XX
//           let formattedValue = "+7 (";
//           if (value.length > 1) {
//             formattedValue += value.substring(1, 4);
//           }
//           if (value.length >= 4) {
//             formattedValue += ") " + value.substring(4, 7);
//           }
//           if (value.length >= 7) {
//             formattedValue += "-" + value.substring(7, 9);
//           }
//           if (value.length >= 9) {
//             formattedValue += "-" + value.substring(9, 11);
//           }
//           e.target.value = formattedValue;
//         }
//       });

//     // Проверка согласия
//     if (!agreementCheckbox.checked) {
//       agreeError.classList.add("active");
//       isValid = false;
//     } else {
//       agreeError.classList.remove("active");
//     }

//     // Если всё прошло успешно
//     if (isValid) {
//       showModal();
//     }
//   };

//   // Функция открытия модального окна
//   function showModal() {
//     const modal = document.getElementById("successModal");
//     if (modal) {
//       modal.style.display = "flex";
//     }
//   }

//   // Закрытие модального окна
//   const modalCloseBtn = document.querySelector(".modal_close");
//   if (modalCloseBtn) {
//     modalCloseBtn.addEventListener("click", () => {
//       const modal = document.getElementById("successModal");
//       if (modal) {
//         modal.style.display = "none";
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  // === Маска для телефонов ===
  // === Маска для телефонов по вашему коду ===
  function applyPhoneMask(inputElement) {
    inputElement.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Оставляем только цифры

      if (value.length > 0) {
        // Добавляем +7 автоматически
        if (!value.startsWith("7")) {
          value = "7" + value;
        }

        // Формат: +7 (XXX) XXX-XX-XX
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

    // При потере фокуса — если поле пустое или только +7 (
    inputElement.addEventListener("blur", function () {
      if (this.value === "+7 (" || this.value === "+7 ()") {
        this.value = "";
      }
    });

    // При фокусе — восстановить начальный вид, если пусто
    inputElement.addEventListener("focus", function () {
      if (this.value === "") {
        this.value = "+7 (";
      }
    });
  }

  // Применяем маску ко всем полям телефона
  document.querySelectorAll("input[id^='phone']").forEach(applyPhoneMask);

  // === Валидация форм ===
  window.validateForm = function (formId) {
    const form = document.getElementById(formId);

    if (!form) return;

    const nameInput = form.querySelector("input[id^='name']");
    const phoneInput = form.querySelector("input[id^='phone']");
    const agreementCheckbox = form.querySelector("input[type='checkbox']");

    const nameError = document.getElementById(
      formId === "reservationForm1" ? "nameError1" : "nameError2"
    );
    const phoneError = document.getElementById(
      formId === "reservationForm1" ? "phoneError1" : "phoneError2"
    );
    const agreeError = document.getElementById(
      formId === "reservationForm1" ? "agreeError1" : "agreeError2"
    );

    let isValid = true;

    // Проверка имени
    if (!nameInput || !nameInput.value.trim()) {
      nameError?.classList.add("active");
      isValid = false;
    } else {
      nameError?.classList.remove("active");
    }

    // Проверка телефона
    // const phoneRegex =
    //   /^\+7\s$[0-9]{0,3}$\s?[0-9]{0,3}-?[0-9]{0,2}-?[0-9]{0,2}$/;
    // if (!phoneInput || !phoneRegex.test(phoneInput.value)) {
    //   phoneError?.classList.add("active");
    //   isValid = false;
    // } else {
    //   phoneError?.classList.remove("active");
    // }

    // === Проверка телефона (гибкая) ===
    const rawPhone = phoneInput.value.replace(/\D/g, ""); // Оставляем только цифры

    if (rawPhone.length === 0) {
      phoneError.textContent = "Введите телефон";
      phoneError.classList.add("active");
      isValid = false;
    } else if (rawPhone.length < 5) {
      phoneError.textContent = "Введите минимум 5 цифр";
      phoneError.classList.add("active");
      isValid = false;
    } else if (!rawPhone.startsWith("7")) {
      phoneError.textContent = "Номер должен начинаться с 7";
      phoneError.classList.add("active");
      isValid = false;
    } else if (rawPhone.length > 11) {
      phoneError.textContent = "Слишком длинный номер";
      phoneError.classList.add("active");
      isValid = false;
    } else {
      phoneError.classList.remove("active");
    }

    // Проверка согласия
    if (!agreementCheckbox || !agreementCheckbox.checked) {
      agreeError?.classList.add("active");
      isValid = false;
    } else {
      agreeError?.classList.remove("active");
    }

    if (isValid) {
      showModal();
    }

    // Сбрасываем форму
    form.reset();

    // Снимаем галочку с чекбокса
    agreementCheckbox.checked = false;

    // Убираем все сообщения об ошибках
    nameError.classList.remove("active");
    phoneError.classList.remove("active");
    agreeError.classList.remove("active");

    // Восстанавливаем маску телефона (опционально)
    if (formId === "reservationForm1") {
      document.getElementById("phone1").value = "";
    } else if (formId === "reservationForm2") {
      document.getElementById("phone2").value = "";
    }
  };

  // === Модальное окно ===
  function showModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
      modal.style.display = "flex";
    }
  }

  // Закрытие модального окна
  const modalCloseBtn = document.querySelector(".modal_close");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      const modal = document.getElementById("successModal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  }
});

// document
//   .getElementById("reservationForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     let isValid = true;

//     // проверка имени
//     const name = document.getElementById("name");
//     const nameError = document.getElementById("nameError");
//     if (name.value.trim() === "") {
//       name.classList.add("invalid");
//       nameError.classList.add("active");
//       isValid = false;
//     }

//     // проверка телефона
//     const phone = document.getElementById("phone");
//     const phoneError = document.getElementById("phoneError");
//     // Удаляем все нецифровые символы и проверяем длину
//     const phoneDigits = phone.value.replace(/\D/g, "");
//     if (phoneDigits.length < 10) {
//       phone.classList.add("invalid");
//       phoneError.classList.add("active");
//       isValid = false;
//     } else {
//       phone.classList.remove("invalid");
//       phoneError.classList.remove("active");
//     }

//     // проверка согласия
//     const agreement = document.getElementById("agreement_top");
//     const agreeError = document.getElementById("agreeError");
//     if (!agreement.checked) {
//       agreement.classList.add("invalid");
//       agreeError.classList.add("active");
//       isValid = false;
//     }

//     if (isValid) {
//       // this.submit();
//       showSuccessModal();
//     }
//   });

// Маска для телефона
// document.getElementById("phone").addEventListener("input", function (e) {
//   let value = e.target.value.replace(/\D/g, "");
//   if (value.length > 0) {
//     // Форматирование: +7 (XXX) XXX-XX-XX
//     let formattedValue = "+7 (";
//     if (value.length > 1) {
//       formattedValue += value.substring(1, 4);
//     }
//     if (value.length >= 4) {
//       formattedValue += ") " + value.substring(4, 7);
//     }
//     if (value.length >= 7) {
//       formattedValue += "-" + value.substring(7, 9);
//     }
//     if (value.length >= 9) {
//       formattedValue += "-" + value.substring(9, 11);
//     }
//     e.target.value = formattedValue;
//   }
// });

// // модальное окно
// function showSuccessModal() {
//   const modal = document.getElementById("successModal");
//   modal.classList.add("active");

//   // сброс формы
//   document.getElementById("reservationForm").reset();
// }

// function closeSuccessModal() {
//   const modal = document.getElementById("successModal");
//   modal.classList.remove("active");
// }

// // закрыть по клику на крестик
// document
//   .querySelector(".modal_close")
//   .addEventListener("click", closeSuccessModal);

// // закрыть по клику вне модального окна
// document.getElementById("successModal").addEventListener("click", function (e) {
//   if (e.target === this) {
//     closeSuccessModal();
//   }
// });

// // Закрытие по ESC
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape") {
//     closeSuccessModal();
//   }
// });
