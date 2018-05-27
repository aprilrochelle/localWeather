const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const searchWeather = (zip) => {
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

const showWeather = (zip) => {
  searchWeather(zip)
    .then((result) => {
      dom.currentWeather(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  setKey,
  showWeather,
};
