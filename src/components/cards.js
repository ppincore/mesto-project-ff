import { popupTypeImage } from '../scripts/index.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createCard(cardTemplate, cardData,onLikeCard) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');

  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openImagePopup);
  likeButton.addEventListener('click', onlikeCard);

  return card;
}

function openImagePopup(e){
  const popupImage = popupTypeImage.querySelector('.popup__image')
  popupImage.src = e.target.src
  popupImage.alt = e.target.alt
  popupTypeImage.classList.add('popup_is-opened')
}

function deleteCard(e) {
  const target = e.target;
  const deletedCard = target.closest('.places__item');
  deletedCard.remove();
}

function likeCard(e) {
  const target = e.target;
  const likedCard = target.closest('.places__item');
  likedCard.classList.add('card__like-button_is-active')
}

export { initialCards, createCard, likeCard,openImagePopup};
