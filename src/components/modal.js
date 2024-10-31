function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0);

  popup.addEventListener('mousedown', closePopup);
  document.addEventListener('keydown', closePopup);
}

function closePopup(e) {
  const popup = document.querySelector('.popup_is-opened');
  const target = e.target;
  if (
    e.key === 'Escape' ||
    target.classList.contains('popup__close') ||
    target.classList.contains('popup__form') ||
    target === popup
  ) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 600);
    
    popup.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopup);
  }
}

export { closePopup, openModal };
