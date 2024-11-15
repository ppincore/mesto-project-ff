import '../pages/index.css';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { initialCards } from '../components/cards.js';
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
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
// Форма 1
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
nameInput.setAttribute('minlength', '2')
nameInput.setAttribute('mixlength', '40')
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

jobInput.setAttribute('minlength', '2')
jobInput.setAttribute('mixlength', '200')

// эл-ы ошибок Форма 1

const nameErrorMessage = formEditProfile.querySelector(
  `.${nameInput.id}-error`
);
const jobErrorMessage = formEditProfile.querySelector(`.${jobInput.id}-error`);

// Форма 2
const formAddCard = document.forms['new-place'];
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
cardNamePlace.setAttribute('minlength', '2')
cardNamePlace.setAttribute('mixlength', '30')
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');
// эл-ы ошибок Форма 2
const cardNameErrorMessage = formAddCard.querySelector(
  `.${cardNamePlace.id}-error`
);
const cardImageErrorMessage = formAddCard.querySelector(
  `.${cardImageLink.id}-error`
);

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
    likeCard
  );
  cardList.append(card);
});

formAddCard.addEventListener('submit', addNewCard);

formEditProfile.addEventListener('submit', editProfileSection);

addButton.addEventListener('click', (e) => {
  openModal(popupTypeNewCard);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

closePopupButton.forEach((button) => {
  button.addEventListener('click', () =>
    closeModal(button.closest('.popup_is-opened'))
  );
});
