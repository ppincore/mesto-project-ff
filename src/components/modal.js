

function closeModal(e) {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close') ||
    e.target.classList.contains('popup__button')
  ) {
    e.target.closest('.popup').classList.remove('popup_is-opened');
  }
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(e) {
  if (e.key.toLowerCase() === 'escape') {
    const closePopup = popupArray.find((popup) => {
      return popup.classList.contains('popup_is-opened');
    });
    if (closePopup) {
      closePopup.classList.remove('popup_is-opened');
    }
  }
}



// export { openModal};
