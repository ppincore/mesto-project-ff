import '../pages/index.css';
import { initialCards, createCard, likeCard } from '../components/cards.js';
import { openModal} from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');

const popupList = document.querySelectorAll('.popup');
const popupArray = Array.from(popupList);

popupArray.forEach((i) => i.classList.add('popup_is-animated'));

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector(
  '.profile__description'
);

const formAddCard = document.forms['new-place'];
const cardNamePlace = formAddCard.querySelector('.popup__input_type_card-name');
const cardImageLink = formAddCard.querySelector('.popup__input_type_url');

initialCards.forEach((item) => {
  const card = createCard(cardTemplate, item,likeCard);
  cardList.append(card);
});

profileSection.addEventListener('click', openModal);

formEditProfile.addEventListener('submit', editProfileSection);

formAddCard.addEventListener('submit', addCard);

function addCard(e) {
  e.preventDefault();
  const obj = {
    name: cardNamePlace.value,
    link: cardImageLink.value,
  };
  const newCard = createCard(cardTemplate, obj);
  cardList.prepend(newCard);
  formAddCard.reset();
}

function editProfileSection(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formElement.reset();
}


