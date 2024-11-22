import '../pages/index.css';
import { createCard } from '../components/card.js';
import {
  getInitialCards,
  getProfileData,
  patchProfileSection,
  postNewCard,
  deleteMyCard,
  deleteLikeCard,
  putLikeCard,
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

function deleteCard({ cardId, buttonElement }) {
  deleteMyCard(cardId).then(() => {
    buttonElement.closest('.card').remove();
  });
}

function likeCard({ buttonElement, cardId, counter }) {
  if (!buttonElement.classList.contains('card__like-button_is-active')) {
    putLikeCard(cardId).then(({ likes }) => {
      buttonElement.classList.toggle('card__like-button_is-active');
      counter.textContent = likes.length;
    });
  } else {
    deleteLikeCard(cardId).then(({ likes }) => {
      buttonElement.classList.toggle('card__like-button_is-active');
      counter.textContent = !likes.length ? '' : likes.length;
    });
  }
}

function buildCardElement(myId, cardData) {
  const card = createCard({
    cardTemplate,
    cardData,
    openImagePopup,
    onCardDelete: deleteCard,
    onLikeCard: likeCard,
    myId,
  });
  cardList.append(card);
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
  profileAvatar.style = `background-image: url(${avatar})`;
}

formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  postNewCard({ name: cardNamePlace.value, link: cardImageLink.value }).then(
    (cardData) => {
      const card = createCard({
        cardTemplate,
        cardData,
        openImagePopup,
        onCardDelete: deleteCard,
        onLikeCard: likeCard,
      });
      cardList.prepend(card);
      formAddCard.reset();
      closeModal(popupTypeNewCard);
    }
  );
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
  ([{ name, avatar, about, _id }, cardData]) => {
    setProfileInfo({ name, avatar, about });
    cardData.forEach((card) => {
      buildCardElement(_id, card);
    });
  }
);
enableValidation(validationConfig);
