function showValidation({
  formElement,
  inputElement,
  inputErorrClass,
  errorClass,
  errorMessage,
}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErorrClass);
}
function hideValidation({
  formElement,
  inputElement,
  inputErorrClass,
  errorClass,
}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErorrClass);
}
function checkInputValidity({
  formElement,
  inputElement,
  inputErorrClass,
  errorClass,
}) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else inputElement.setCustomValidity('');

  if (!inputElement.validity.valid) {
    showValidation({
      formElement,
      inputElement,
      inputErorrClass,
      errorClass,
      errorMessage: inputElement.validationMessage,
    });
  } else {
    hideValidation({ formElement, inputElement, inputErorrClass, errorClass });
  }
}
function toggleButton({ inputList, submitButtonElement, inactiveButtonClass }) {
  if (inputList.some((input) => !input.validity.valid)) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
}
function setEvents({
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButton({ inputList, submitButtonElement, inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity({
        formElement,
        inputElement,
        errorClass,
        inputErrorClass,
      });
      toggleButton({ inputList, submitButtonElement, inactiveButtonClass });
    });
  });
}
function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = document.querySelectorAll(formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault());
    setEvents({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
}
function clearValidation(
  formElement,
  {
    submitButtonSelector,
    inactiveButtonClass,
    inputSelector,
    inputErrorClass,
    errorClass,
  }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideValidation({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
    });
  });
  toggleButton({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });
}
export { enableValidation, clearValidation };
