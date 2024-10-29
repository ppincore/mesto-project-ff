function openModal(e){

}


function closePopup(e) {
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
    e.target.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
  }
  document.removeEventListener('keydown', closeModalEsc);
}
export {closePopup,closeModalEsc,openModal}