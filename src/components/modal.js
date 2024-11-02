function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
}
function closeEscPopup(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}
export { openModal, closeModal };
