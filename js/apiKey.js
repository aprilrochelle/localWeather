const weather = require('./weather');

const apiKey = () => {
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

const retrieveKey = () => {
  apiKey()
    .then((results) => {
      weather.setKey(results.openWeather.apiKey);
    })
    .catch((err) => {
      console.error('no keys: ', err);
    });
};

module.exports = {
  retrieveKey,
};
