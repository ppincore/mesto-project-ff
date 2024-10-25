import '../pages/index.css'
import {initialCards} from './cards.js'

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const profileSection = document.querySelector('.profile')

profileSection.addEventListener('click',(e)=>{console.log(e.target)})


const popupList = document.querySelectorAll('.popup')
const popupArray = Array.from(popupList)
// создание карточки
function createCard(template, arrayItem) {
  const card = template.querySelector(".places__item").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");

  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  
  cardTitle.textContent = arrayItem.name;
  cardImage.setAttribute("src", arrayItem.link);
  cardImage.setAttribute("alt", arrayItem.name);

  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener('click',openPopupImage)

  return card;
}
// удаление карточки
function deleteCard(e) {
  let target = e.target;
  let deletedCard = target.closest(".places__item");
  deletedCard.remove();
}
//функция открытия попап изображения
function openPopupImage(e){
  const popupImage = popupArray.find((popup)=>{
   return popup.classList.contains('popup_type_image')
  })
  popupImage.querySelector('.popup__image').src = e.target.src
  popupImage.classList.add('popup_is-opened')
}



// добавление карточек на страницу
initialCards.forEach((item) => {
  const card = createCard(cardTemplate, item);
  cardList.append(card);
});



const p = document.querySelector('.popup_type_new-card')
.addEventListener('click',(e)=>{
  
  if(e.target.contains('.popup'))
  {
    
  }

})