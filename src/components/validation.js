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
function toggleButton({ inputList, submitButton, inactiveButtonClass }) {
  if (inputList.some((input) => input.validity.valid)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
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

  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButton({ inputList, submitButton, inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity({
        formElement,
        inputElement,
        errorClass,
        inputErrorClass,
      });
      toggleButton({ inputList, submitButton, inactiveButtonClass });
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
function clearValidation() {}
export { enableValidation, clearValidation };
