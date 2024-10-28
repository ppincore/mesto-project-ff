
function openModal(e) {
  let target = e.target;
  let popup = null;
  const obj = {
    'profile__edit-button': 'popup_type_edit',
    'profile__add-button': 'popup_type_new-card',
    card__image: 'popup_type_image',
  };
  for (let key in obj) {
    if (target.classList.contains(key)) {
      popup = popupArray.find((i) => i.classList.contains(obj[key]));
      if (popup) {
        if (popup.classList.contains('popup_type_image')) {
          popup.querySelector('.popup__image').src = e.target.src;
        } else if (popup.classList.contains('popup_type_edit')) {
          nameInput.value = profileTitle.textContent;
          jobInput.value = profileDescription.textContent;
        }
        popup.classList.add('popup_is-opened');

        document.addEventListener('keydown', closeModalEsc);
        popup.addEventListener('mousedown', closeModal);
      }
      break;
    }
  }
}

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



export { openModal};
