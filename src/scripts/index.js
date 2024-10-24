import '../pages/index.css'
import {initialCards} from './cards.js'

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const profileSection = document.querySelector('.profile')


function createCard(template, arrayItem) {
  const card = template.querySelector(".places__item").cloneNode(true);

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  cardTitle.textContent = arrayItem.name;
  cardImage.setAttribute("src", arrayItem.link);
  cardImage.setAttribute("alt", arrayItem.name);

  return card;
}

function deleteCard(e) {
  let target = e.target;
  let deletedCard = target.closest(".places__item");
  deletedCard.remove();
}

initialCards.forEach((item) => {
  const card = createCard(cardTemplate, item);
  cardList.append(card);
});

profileSection.addEventListener('click',(e)=>{
  
  // if(e.target.classList.contains('profile__edit-button')){
  //   const popUpEdit = document.querySelector('.popup_type_edit')
  //   popUpEdit.classList.add('popup_is-opened')
  // } else if ( e.target.classList.contains('profile__add-button')){
  //   const popUpEdit = document.querySelector('.popup_type_new-card')
  //   popUpEdit.classList.add('popup_is-opened')
  // }
})