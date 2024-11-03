function createCard(
  cardTemplate,
  cardData,
  openImagePopup,
  onCardDelete,
  onLikeCard
) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  deleteButton.addEventListener('click', () => onCardDelete(card));

  cardImage.addEventListener('click', () => openImagePopup(cardData));
  likeButton.addEventListener('click', () => onLikeCard(likeButton));

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

export { createCard, deleteCard, likeCard };
