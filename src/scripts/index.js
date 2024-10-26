import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');

const popupList = document.querySelectorAll('.popup');
const popupArray = Array.from(popupList);


const formElement  = document.forms['edit-profile']
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

const profileTitle = profileSection.querySelector('.profile__title')
const profileDescription = profileSection.querySelector('.profile__description')

const formAddCard = document.forms['new-place']
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name')
const cardImageLink = formAddCard.querySelector('.popup__input_type_url')
console.log(cardImageLink.value)
// добавление карточек на страницу
initialCards.forEach((item) => {
  const card = createCard(cardTemplate, item);
  cardList.append(card);
});

// СЛУШАТЕЛИ СОБЫТИЙ

// прослушиватель на секциюю
profileSection.addEventListener('click', openPopup);
// просшуливатель на форму профиля
formElement.addEventListener('submit', handleFormSubmit); 
// прослушиватель на форму добавления карточки
formAddCard.addEventListener('submit',addCard)
// ФУНКЦИИ

// создание карточки
function createCard(template, arrayItem) {
  const card = template.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');

  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');

  cardTitle.textContent = arrayItem.name;
  cardImage.setAttribute('src', arrayItem.link);
  cardImage.setAttribute('alt', arrayItem.name);

  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openPopup);

  return card;
}

// удаление карточки
function deleteCard(e) {
  let target = e.target;
  let deletedCard = target.closest('.places__item');
  deletedCard.remove();
}

// функция откртытия попапа
function openPopup(e) {
  let target = e.target;
  let popup = null;
  const obj = {
    'profile__edit-button': 'popup_type_edit',
    'profile__add-button': 'popup_type_new-card',
    'card__image': 'popup_type_image',
  };
  for (let key in obj) {
    if (target.classList.contains(key)) {
      popup = popupArray.find((i) => i.classList.contains(obj[key]));
      if (popup) {
        if (popup.classList.contains('popup_type_image')) {
          popup.querySelector('.popup__image').src = e.target.src;
        } else if(popup.classList.contains('popup_type_edit')){
          nameInput.value = profileTitle.textContent  
          jobInput.value  =  profileDescription.textContent
        }
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', closeEsc)
        popup.addEventListener('click',closePopup)
      }
      break;
    }
  }
  
}
// функция закрытия попапа
function closePopup(e) {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close') ||
    e.target.classList.contains('popup__button')
  ) {
    e.target.closest('.popup').classList.remove('popup_is-opened');
  }
  document.removeEventListener('keydown',closeEsc)
}

// функция закрытия попап по esc
function closeEsc(e) {
  if (e.key.toLowerCase() === 'escape') {
    const closePopup = popupArray.find((popup) => {
      return popup.classList.contains('popup_is-opened');
    });
    if (closePopup) {
      closePopup.classList.remove('popup_is-opened');
    }
  }
}

//функция для формы изменения секции профиля
function handleFormSubmit(e){
  e.preventDefault();
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  formElement.reset()
}

// форма для добавления новой карточки

// function addCard(e){
//   e.preventDefault();
//   const obj = {}
//   obj.name = cardNamePlace.value
//   obj.link = cardImageLink.value
//   console.log(obj)
//   initialCards.unshift(obj)
//   console.log(initialCards)
// }