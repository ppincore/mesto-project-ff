import '../pages/index.css';
import {initialCards,createCard} from '../components/cards.js';
import {openModal,handleFormSubmit, addCard} from '../components/modal.js'


const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');

const popupList = document.querySelectorAll('.popup');
const popupArray = Array.from(popupList);

popupArray.forEach((i)=>i.classList.add('popup_is-animated'))

const formElement  = document.forms['edit-profile']
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

const profileTitle = profileSection.querySelector('.profile__title')
const profileDescription = profileSection.querySelector('.profile__description')

const formAddCard = document.forms['new-place']
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name')
const cardImageLink = formAddCard.querySelector('.popup__input_type_url')

// добавление карточек на страницу
initialCards.forEach((item) => {
  const card = createCard(cardTemplate, item);
  cardList.append(card);
});

// СЛУШАТЕЛИ СОБЫТИЙ

// прослушиватель на секциюю
profileSection.addEventListener('click', openModal);
// просшуливатель на форму профиля
formElement.addEventListener('submit', handleFormSubmit); 
// прослушиватель на форму добавления карточки
formAddCard.addEventListener('submit',addCard)
// ФУНКЦИИ



export {nameInput,
    popupArray,
    jobInput,
    profileTitle,
    profileDescription,
    cardNamePlace,
    cardImageLink,
}









