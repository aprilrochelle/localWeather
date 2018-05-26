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

module.exports = {
  setKey,
  searchWeather,
};
