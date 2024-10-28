import { openModal } from '../components/modal.js';

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

function createCard(template, arrayItem) {
  const card = template.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');

  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = arrayItem.name;
  cardImage.setAttribute('src', arrayItem.link);
  cardImage.setAttribute('alt', arrayItem.name);

  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openModal);
  likeButton.addEventListener('click', cardLike);

  return card;
}

function deleteCard(e) {
  let target = e.target;
  let deletedCard = target.closest('.places__item');
  deletedCard.remove();
}

function cardLike(e) {
  if (e.target.classList.contains('card__like-button')) {
    e.target.classList.toggle('card__like-button_is-active');
  }
}

export { initialCards, createCard };
