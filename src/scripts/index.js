import '../pages/index.css'
import {initialCards} from './cards.js'

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const profileSection = document.querySelector('.profile')
const profileSectionButtons = profileSection.querySelectorAll('button')
const popupList = document.querySelectorAll('.popup')
console.log(popupList)
const closeBtn = document.querySelectorAll('.popup__close')

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

closeBtn.forEach((i)=>{
  i.addEventListener('click',(e)=>{
    e.target.closest('.popup').classList.remove('popup_is-opened')
  })
 })

//  function openPopup(target){
//   let popup = document.querySelector(`.${target}`)
//   popup.classList.add('popup_is-opened')
// }

// openPopup('popup_type_edit')
