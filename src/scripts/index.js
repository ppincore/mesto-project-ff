import '../pages/index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from '../components/cards.js';
import { closeModal, openModal } from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const editButton = profileSection.querySelector('.profile__edit-button');
const addButton = profileSection.querySelector('.profile__add-button');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector(
  '.profile__description'
);

// Попапы
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closePopupButton = document.querySelectorAll('.popup__close');

// Форма 1
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);
// Форма 2
const formAddCard = document.forms['new-place'];
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');

function editProfileSection(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

function addNewCard(e) {
  e.preventDefault();
  const cardData = {
    name: cardNamePlace.value,
    link: cardImageLink.value,
  };
  const card = createCard(
    cardTemplate,
    cardData,
    openModal,
    deleteCard,
    likeCard,
    popupTypeImage
  );
  cardList.prepend(card);
  formAddCard.reset();
  closeModal(popupTypeNewCard);
}

function openImagePopup(cardData) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTypeImage.classList.add('popup_is-opened');
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((item) => {
  const card = createCard(
    cardTemplate,
    item,
    openImagePopup,
    deleteCard,
    likeCard,
    popupTypeImage
  );
  cardList.append(card);
});

addButton.addEventListener('click', (e) => {
  openModal(popupTypeNewCard);
  formAddCard.addEventListener('submit', addNewCard);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  formEditProfile.addEventListener('submit', editProfileSection);
});

closePopupButton.forEach((button) => {
  button.addEventListener('click', () =>
    closeModal(button.closest('.popup_is-opened'))
  );
});
