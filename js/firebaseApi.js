let firebaseConfig = {};
let uid = '';

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const setUid = (newUserId) => {
  uid = newUserId;
};

const saveWeatherForecast = (wxObj) => {
  wxObj.uid = uid;
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
      url: `${firebaseConfig.databaseURL}/weather.json?orderBy="uid"&equalTo="${uid}"`,
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

const changeWeatherToScary = (updatedWx, wxId) => {
  updatedWx.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/weather/${wxId}.json`,
      data: JSON.stringify(updatedWx),
    })
      .done((modifiedWx) => {
        resolve(modifiedWx);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveWeatherForecast,
  setConfig,
  setUid,
  uid,
  getSavedWeather,
  deleteWeather,
  changeWeatherToScary,
};
