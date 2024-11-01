function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0);
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);
}

function closePopup(e) {
  const target = e.target;
  const popupToClose = document.querySelector('.popup_is-opened');
  if (
    e.key === 'Escape' ||
    target.type === 'submit' ||
    target.classList.contains('popup__close') ||
    target === popupToClose
  ) {
    popupToClose.classList.remove('popup_is-opened');
    setTimeout(() => {
      popupToClose.classList.remove('popup_is-animated');
    }, 600);
    popupToClose.querySelector('form').reset();
    popupToClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopup);
  }
}

export { openModal };
