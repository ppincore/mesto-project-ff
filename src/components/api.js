const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
  headers: {
    authorization: '246b95aa-f127-4b1a-921b-15891f907931',
    'Content-Type': 'application/json',
  },

};


function getProfileData(){
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else return Promise.reject(`Error ${response.status}`);
  });
}

function getInitialCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else return Promise.reject(`Error ${response.status}`);
  });
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

export { getInitialCards,getProfileData };
