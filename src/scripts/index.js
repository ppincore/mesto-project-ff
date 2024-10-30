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
const editButton = profileSection.querySelector('.profile__edit-button')
const addButton = profileSection.querySelector('.profile__add-button')


const popupArray = Array.from(document.querySelectorAll('.popup'));

const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeEdit = document.querySelector('.popup_type_edit')

const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector(
  '.profile__description');

// nameInput.value = profileTitle.textContent
// jobInput.value = profileDescription.textContent


const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');

popupArray.forEach((i) => i.classList.add('popup_is-animated'));

addButton.addEventListener('click', ()=>{openModal(popupTypeNewCard)})
editButton.addEventListener('click',()=>{openModal(popupTypeEdit)})


initialCards.forEach((item) => {
  const card = createCard(
    cardTemplate,
    item,
    openModal,
    deleteCard,
    likeCard,
    popupTypeImage
  );
  cardList.append(card);
});



// function openImagePopup(cardData) {
//   const popupImage = popupTypeImage.querySelector('.popup__image');

//   popupImage.src = cardData.link;
//   popupImage.alt = cardData.name;

//   popupTypeImage.classList.add('popup_is-opened');

//   popupTypeImage.addEventListener('mousedown',() => closePopup(popupImage))
//   document.addEventListener('keydown',closeModalEsc)
// }
