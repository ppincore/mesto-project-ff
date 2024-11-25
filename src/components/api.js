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
  }).then((res) => {
    return isResponse(res);
  });
}

function getInitialCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((res) => isResponse(res));
}

function patchProfileSection({ name, about }) {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => isResponse(res));
}

function patchProfilePhoto(link) {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return isResponse(res);
  });
}

function postNewCard({ name, link }) {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => isResponse(res));
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
  }).then((res) => isResponse(res));
}

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => isResponse(res));
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
