const weather = require('./weather');
const firebaseApi = require('./firebaseApi');
const {showSavedWeatherEvent, deleteSavedWeather, markScaryWeather,} = require('./events');

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
      showSavedWeatherEvent();
      deleteSavedWeather();
      markScaryWeather();
    })
    .catch((err) => {
      console.error('no keys: ', err);
    });
};

module.exports = {
  retrieveKeys,
};
