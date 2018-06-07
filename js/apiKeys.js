const weather = require('./weather');
const firebaseApi = require('./firebaseApi');
const {checkUserLoginStatus,} = require('./auth');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      weather.setKey(results.openWeather.apiKey);
      firebaseApi.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      checkUserLoginStatus();
    })
    .catch((err) => {
      console.error('no keys: ', err);
    });
};

module.exports = {
  retrieveKeys,
};
