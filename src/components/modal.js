function openModal(e){

}


function closePopup(popup) {
  
  if(popup){
    popup.closest('.popup').classList.remove('popup_is-opened')
    console.log(popup)
    }
    document.removeEventListener('keydown', closeModalEsc);
  }
 


function closeModalEsc() {
 const popup = document.querySelector('.popup_is-opened')
 closePopup(popup)

}

export {closePopup,closeModalEsc,openModal}