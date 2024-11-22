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

  likeButton.addEventListener('click', () =>
    onLikeCard({
      cardId: cardData['_id'],
      counter: likeCount,
      buttonElement: likeButton,
    })
  );

  if (cardData.owner._id === myId) {
    deleteButton.addEventListener('click', () =>
      onCardDelete({
        cardId: cardData['_id'],
        cardElement: card,
        buttonElement: deleteButton,
      })
    );
    deleteButton.disabled = false;
    deleteButton.classList.add('card__delete-button-active');
  }

  cardData.likes.length
    ? (likeCount.textContent = cardData.likes.length)
    : (likeCount.textContent = '');

  cardTitle.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  cardData.likes.forEach((likeOwner) => {
    if (likeOwner._id === myId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  return card;
}
export { createCard };
