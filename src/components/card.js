function createCard({
  cardTemplate,
  cardData,
  openImagePopup,
  onCardDelete,
  onLikeCard,
  ownerId,
}) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-counter');

  cardImage.addEventListener('click', () =>
    openImagePopup({ link: cardData.link, name: cardData.name })
  );
  likeButton.addEventListener('click', () =>
    onLikeCard({
      cardId: cardData['_id'],
      counter: likeCount,
      buttonElement: likeButton,
    })
  );
  if (cardData.owner._id === ownerId) {
    deleteButton.classList.add('card__delete-button-active');
    deleteButton.addEventListener('click', () =>
      onCardDelete({ id: cardData._id, card })
    );
  }
  cardData.likes.length
    ? (likeCount.textContent = cardData.likes.length)
    : (likeCount.textContent = '');

  cardTitle.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  cardData.likes.forEach((likeOwner) => {
    if (likeOwner._id === ownerId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  return card;
}
export { createCard };
