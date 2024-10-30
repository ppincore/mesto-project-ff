function openModal(popup){

  popup.classList.add('popup_is-opened')
  popup.addEventListener('mousedown',()=>closePopup(popup))
  document.addEventListener('keydown',()=>closePopup(popup))
}


function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
  console.log(popup)
  popup.removeEventListener('mousedown',close)
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc() {


}

export {closePopup,closeModalEsc,openModal}