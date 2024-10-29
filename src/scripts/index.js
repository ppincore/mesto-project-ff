import '../pages/index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from '../components/cards.js';
import { closePopup, closeModalEsc, openModal } from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');

const popupList = document.querySelectorAll('.popup');
const popupArray = Array.from(popupList);
const popupTypeImage = document.querySelector('.popup_type_image');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector(
  '.profile__description'
);

nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

const formAddCard = document.forms['new-place'];
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');

popupArray.forEach((i) => i.classList.add('popup_is-animated'));

initialCards.forEach((item) => {
  const card = createCard(
    cardTemplate,
    item,
    openImagePopup,
    deleteCard,
    likeCard
  );
  cardList.append(card);
});



function openImagePopup(e) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;
  popupTypeImage.classList.add('popup_is-opened');
  popupTypeImage.addEventListener('mousedown',closePopup)
  document.addEventListener('keydown',closeModalEsc)
}
