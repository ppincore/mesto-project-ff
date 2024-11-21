function createCard({
  cardTemplate,
  cardData,
  openImagePopup,
  onCardDelete,
  onLikeCard,
  myId,
}) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-counter');

  deleteButton.disabled = true;

  cardImage.addEventListener('click', () => openImagePopup(cardData));
  likeButton.addEventListener('click', () => onLikeCard(likeButton));
  if (cardData.owner._id === myId) {
    deleteButton.addEventListener('click', () => onCardDelete({
      cardId: cardData['_id'],
      cardElement: card,
      buttonElement: deleteButton,
    }));
    deleteButton.disabled = false;
    deleteButton.classList.add('card__delete-button-active');
  }
  likeCount.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  return card;
}

function deleteCard(cardElement) {
  const deletedCard = cardElement.closest('.places__item');
  deletedCard.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard };
