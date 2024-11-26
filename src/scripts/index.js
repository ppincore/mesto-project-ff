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
  patchProfilePhoto,
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
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditAvatar = document.querySelector('.popup_type_avatar_edit');
const closePopupButton = document.querySelectorAll('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupConfirmDelete = document.querySelector('.popup_type_card-delete');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);
const formAddCard = document.forms['new-place'];
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');
const formChangeProfileImage = document.forms['edit-avatar'];
const profileImageLink = formChangeProfileImage.querySelector(
  '.popup__input_photo_url'
);
const conifirmForm = document.forms['conifirm-delete'];

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

function showButtonLoading({ state, form }) {
  const buttonElement = form.querySelector('.popup__button');
  return state
    ? buttonElement.classList.add('popup__button_is-loading')
    : buttonElement.classList.remove('popup__button_is-loading');
}

function deleteCard({ cardId, buttonElement }) {
  openModal(popupConfirmDelete);
  function deleteCardSubmit(e) {
    showButtonLoading({ state: true, form: conifirmForm });
    e.preventDefault();
    deleteMyCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();
        closeModal(popupConfirmDelete);
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      })
      .finally(() => {
        conifirmForm.removeEventListener('submit', deleteCardSubmit);
      });
  }
  showButtonLoading({ state: false, form: conifirmForm });
  conifirmForm.addEventListener('submit', deleteCardSubmit);
}

function likeCard({ buttonElement, cardId, counter }) {
  if (!buttonElement.classList.contains('card__like-button_is-active')) {
    putLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.toggle('card__like-button_is-active');
        counter.textContent = likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка:, ${err}`);
      });
  } else {
    deleteLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.toggle('card__like-button_is-active');
        counter.textContent = !likes.length ? '' : likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка:, ${err}`);
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

function openImagePopup({ link, name }) {
  popupImage.src = '';
  popupImage.alt = '';
  popupImageCaption.textContent = name;
  (function popupOnLoad() {
    openModal(popupTypeImage);
  })();
  popupImage.src = link;
  popupImage.alt = name;
}

function setProfileInfo({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}
function setProfilePhoto({ avatar }) {
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  showButtonLoading({ state: true, form: formAddCard });
  postNewCard({ name: cardNamePlace.value, link: cardImageLink.value })
    .then((cardData) => {
      const card = createCard({
        cardTemplate,
        cardData,
        openImagePopup,
        onCardDelete: deleteCard,
        onLikeCard: likeCard,
        myId: cardData.owner['_id'],
      });
      cardList.prepend(card);
      formAddCard.reset();
      closeModal(popupTypeNewCard);
    })
    .finally(() => showButtonLoading({ state: false, form: formAddCard }));
});

formEditProfile.addEventListener('submit', (e) => {
  showButtonLoading({ state: true, form: formEditProfile });
  e.preventDefault();
  patchProfileSection({ name: nameInput.value, about: jobInput.value })
    .then(({ name, about, avatar }) => {
      setProfileInfo({
        name,
        about,
        avatar,
      });
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => showButtonLoading({ state: false, form: formEditProfile }));
  closeModal(popupTypeEdit);
});

formChangeProfileImage.addEventListener('submit', (e) => {
  showButtonLoading({ state: true, form: formChangeProfileImage });
  e.preventDefault();

  patchProfilePhoto(profileImageLink.value)
    .then(({ name, about, avatar }) => {
      setProfilePhoto({ avatar });
      closeModal(popupTypeEditAvatar);
    })
    .catch((err) => {
      console.error(`Ошибка:, ${err}`);
      closeModal(popupTypeEditAvatar);
    })
    .finally(() =>
      showButtonLoading({ state: false, form: formChangeProfileImage })
    );
});

addButton.addEventListener('click', () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(popupTypeNewCard);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupTypeEdit);
});

profileAvatar.addEventListener('click', () => {
  formChangeProfileImage.reset();
  clearValidation(formChangeProfileImage, validationConfig);
  openModal(popupTypeEditAvatar);
});

Promise.all([getProfileData(), getInitialCards()])
  .then(([{ name, avatar, about, _id }, cardData]) => {
    setProfileInfo({ name, avatar, about });
    cardData.forEach((card) => {
      buildCardElement(_id, card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка:, ${err}`);
  });
enableValidation(validationConfig);
