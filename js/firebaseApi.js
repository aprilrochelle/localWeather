let firebaseConfig = {};

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const saveWeatherForecast = (wxObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/weather.json`,
      data: JSON.stringify(wxObj),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getSavedWeather = () => {
  return new Promise((resolve, reject) => {
    const savedWeatherArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/weather.json`,
    })
      .done((allWeatherObj) => {
        if (allWeatherObj !== null) {
          Object.keys(allWeatherObj).forEach((uniqueKey) => {
            allWeatherObj[uniqueKey].id = uniqueKey;
            savedWeatherArray.push(allWeatherObj[uniqueKey]);
          });
        }
        resolve(savedWeatherArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteWeather = (weatherId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/weather/${weatherId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveWeatherForecast,
  setConfig,
  getSavedWeather,
  deleteWeather,
};
