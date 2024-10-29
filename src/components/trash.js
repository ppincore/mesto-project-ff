

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



 export { closeModal};


function likeCard(e) {
  const target = e.target;
  const likedCard = target.closest('.places__item');
  likedCard.classList.add('card__like-button_is-active')
}

function addCard(e) {
  e.preventDefault();
  const obj = {
    name: cardNamePlace.value,
    link: cardImageLink.value,
  };
  const newCard = createCard(cardTemplate, obj);
  cardList.prepend(newCard);
  formAddCard.reset();
}

function editProfileSection(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formEditProfile.reset();
}

export {popupTypeImage}
