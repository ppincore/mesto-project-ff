function showInputError({
  formSelector,
  inputSelector,
  errorMessage,
  errorClass,
  inputErrorClass,
}) {
  const errorElem = formSelector.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(errorClass);
  inputSelector.classList.add(inputErrorClass);
}

function hideInputError({
  formSelector,
  inputSelector,
  errorClass,
  inputErrorClass,
}) {
  const errorElem = formSelector.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = '';
  errorElem.classList.remove(errorClass);
  inputSelector.classList.remove(inputErrorClass);
}

function toggleButtonState({
  inputList,
  submitButtonForm,
  inactiveButtonClass,
}) {
  if (!inputList.validity.valid) {
    submitButtonForm.disabled = true;
    submitButtonForm.classList.add(inactiveButtonClass);
  } else {
    submitButtonForm.disabled = false;
    submitButtonForm.classList.remove(inactiveButtonClass);
  }
}

function checkInputValidity({
  formSelector,
  inputSelector,
  inputErrorClass,
  errorClass,
}) {
  if (!inputSelector.validity.valid) {
    showInputError({
      formSelector,
      inputSelector,
      errorMessage: inputSelector.validationMessage,
      errorClass,
      inputErrorClass,
    });
  } else {
    hideInputError({
      formSelector,
      inputSelector,
      errorClass,
      inputErrorClass,
    });
  }
}

function setEventListners({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>
      checkInputValidity({
        formSelector,
        inputSelector,
        inputErrorClass,
        errorClass,
      })
    );
    toggleButtonState({ inputList, submitButtonSelector, inactiveButtonClass });
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
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault());
  });
  setEventListners({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  })
}
function clearValidation() {}

export { enableValidation, clearValidation };
