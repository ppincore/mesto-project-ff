const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
  headers: {
    authorization: '246b95aa-f127-4b1a-921b-15891f907931',
    'Content-Type': 'application/json',
  },
};

function isResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Error ${res.status}`);
}

function getProfileData() {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  }).then((res) => isResponse(res));
}

function getInitialCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((res) => isResponse(res));
}

function patchProfileSection({ name, description }) {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about:description,
    }),
  }).then((res) => isResponse(res))
}

function postNewCard({ name, link }) {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  }).then((res)=>isResponse(res))
}

function deleteMyCard(cardId){
  return fetch(`${config.baseUrl}cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  }).then((res)=> isResponse(res))
} 
// function postNewCard() {
//   return fetch(`${config.baseUrl}cards`,{
//     headers: config.headers
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else return Promise.reject(`Error ${response.status}`);
//   });
// }

export { getInitialCards, getProfileData, patchProfileSection,postNewCard,deleteMyCard };
