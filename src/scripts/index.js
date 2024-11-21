import '../pages/index.css';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import {
  getInitialCards,
  getProfileData,
  patchProfileSection,
  postNewCard,
} from '../components/api.js';
import { closeModal, openModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';

const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const editButton = profileSection.querySelector('.profile__edit-button');
const addButton = profileSection.querySelector('.profile__add-button');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector(
  '.profile__description'
);
const profileAvatar = profileSection.querySelector('.profile__image');

// Попапы
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closePopupButton = document.querySelectorAll('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
});

closePopupButton.forEach((button) => {
  button.addEventListener('click', () =>
    closeModal(button.closest('.popup_is-opened'))
  );
});

function buildCardElement(cardData) {
  const card = createCard(
    cardTemplate,
    cardData,
    openImagePopup,
    deleteCard,
    likeCard
  );
  cardList.append(card);
}

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
    openImagePopup,
    deleteCard,
    likeCard
  );
  cardList.prepend(card);
  formAddCard.reset();
  closeModal(popupTypeNewCard);
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

function setProfileInfo({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  console.log(profileDescription.textContent)
  profileAvatar.style = `background-image: url(${avatar})`;
}

formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  postNewCard({ name: cardNamePlace.value, link: cardImageLink.value })
  .then((cardData)=>{
    const card = createCard(
      cardTemplate,
      cardData,
      openImagePopup,
      deleteCard,
      likeCard
    );
    cardList.prepend(card);
    formAddCard.reset();
    closeModal(popupTypeNewCard);
  })
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  patchProfileSection({ name: nameInput.value, description: jobInput.value })
    .then(({ name, about, avatar }) => {
      setProfileInfo({
        name,
        about,
        avatar,
      });
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.log(err));
  closeModal(popupTypeEdit);
});

addButton.addEventListener('click', () => {
  clearValidation(formAddCard, validationConfig);
  openModal(popupTypeNewCard);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupTypeEdit);
});

Promise.all([getProfileData(), getInitialCards()]).then(
  ([{ name, avatar, about }, cardData]) => {
    setProfileInfo({ name, avatar, about });
    console.log(cardData)
    cardData.forEach((card) => {
      buildCardElement(card);
     
    });
  }
);
enableValidation(validationConfig);
