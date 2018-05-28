const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const getCurrentWeather = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const getWxForecast = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showWeather = (zip) => {
  getCurrentWeather(zip)
    .then((results) => {
      dom.currentWeather(results);
    })
    .catch((err) => {
      console.error(err);
    });
};

const showForecast = (zip) => {
  getWxForecast(zip)
    .then((results) => {
      dom.forecast5(results);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  setKey,
  showWeather,
  showForecast,
};
