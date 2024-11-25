const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
  headers: {
    authorization: '246b95aa-f127-4b1a-921b-15891f907931',
    'Content-Type': 'application/json',
  },
};

function isResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

function getProfileData() {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    method: 'GET',
  }).then(isResponse)
}

function getInitialCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then(isResponse);
}

function patchProfileSection({ name, about }) {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(isResponse);
}

function patchProfilePhoto(link) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(isResponse);
}

function postNewCard({ name, link }) {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(isResponse);
}

function deleteMyCard(cardId) {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => isResponse(res));
}

function putLikeCard(cardId) {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(isResponse);
}

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(isResponse);
}

export {
  getInitialCards,
  getProfileData,
  patchProfileSection,
  postNewCard,
  deleteMyCard,
  deleteLikeCard,
  putLikeCard,
  patchProfilePhoto,
};
