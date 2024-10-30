function openModal(popup){
  popup.classList.add('popup_is-opened')
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);
}


function closePopup(e) {
  const popup = document.querySelector('.popup_is-opened');
  const target = e.target
  if(e.key ==='Escape'){
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopup);
  }
  if(target.classList.contains('popup__close') || e.target === popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopup);
  }
}


export {closePopup,openModal}