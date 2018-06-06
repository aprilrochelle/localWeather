const weather = require('./weather');
const dom = require('./dom');
const {saveWeatherForecast, getSavedWeather, deleteWeather, changeWeatherToScary,} = require('./firebaseApi');

const checkZip = () => {
  const userZip = $('#user-zip').val();
  if (userZip.length === 5 && $.isNumeric(userZip)) {
    weather.getCurrentWeather(userZip)
      .then((results) => {
        dom.currentWeather(results, 'wxBox');
        $('#forecast').html('');
        $('#getForecasts').removeClass('hide');
        $('#savedForecasts').addClass('hide');
        forecastEvents();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    alert('Please enter a 5-digit zip code.');
  }
};

const validationEvents = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      checkZip();
    }
  });
  $('#zip-btn').click(checkZip);
};

const forecastEvents = () => {
  const zip = $('#user-zip').val();
  $('#day5').on('click', () => {
    weather.getWxForecast(zip)
      .then((results) => {
        dom.forecast5(results, 'forecast');
      })
      .catch((err) => {
        console.error(err);
      });
  });
  $('#day3').on('click', () => {
    weather.getWxForecast(zip)
      .then((results) => {
        dom.forecast3(results, 'forecast');
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const saveWeatherEvent = () => {
  $(document).on('click', '.saveWx', (e) => {
    const weatherObjToAdd = $(e.target).closest('.weather');
    const weatherObj = {
      city: weatherObjToAdd.find('.cityName').text(),
      date: weatherObjToAdd.find('.date-time').text(),
      temperature: weatherObjToAdd.find('.temp').text(),
      conditions: weatherObjToAdd.find('.conditions').text(),
      pressure: weatherObjToAdd.find('.pressure').text(),
      windSpeed: weatherObjToAdd.find('.wind').text(),
      isScary: false,
      img: weatherObjToAdd.find('img').data('icon'),
    };
    saveWeatherForecast(weatherObj);
  });
};

const showSavedWeather = () => {
  getSavedWeather()
    .then((results) => {
      dom.savedWxForecasts(results, 'savedList');
      $('#getForecasts').addClass('hide');
      $('#savedForecasts').removeClass('hide');
    })
    .catch((error) => {
      console.error(error);
    });
};

const showSavedWeatherEvent = () => {
  $('#saved-link').click(() => {
    showSavedWeather();
  });
};

const deleteSavedWeather = () => {
  $(document).on('click','.deleteWx', (e) => {
    const wxToDelete = $(e.target).closest('.weather').data('firebaseId');
    deleteWeather(wxToDelete)
      .then(() => {
        showSavedWeather();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const markScaryWeather = () => {
  $(document).on('click', '.scary-btn', (e) => {
    const weatherToUpdateId = $(e.target).closest('.weather').data('firebaseId');
    const updatedWeatherCard = $(e.target).closest('.weather');
    const updatedWeather = {
      city: updatedWeatherCard.find('.cityName').text(),
      date: updatedWeatherCard.find('.date-time').text(),
      temperature: updatedWeatherCard.find('.temp').text(),
      conditions: updatedWeatherCard.find('.conditions').text(),
      pressure: updatedWeatherCard.find('.pressure').text(),
      windSpeed: updatedWeatherCard.find('.wind').text(),
      isScary: true,
      img: updatedWeatherCard.find('img').data('icon'),
    };
    changeWeatherToScary(updatedWeather, weatherToUpdateId)
      .then(() => {
        showSavedWeather();
      })
      .catch((error) => {
        console.error('error in updating weather', error);
      });
  });
};

const initializer = () => {
  validationEvents();
  saveWeatherEvent();
};

module.exports = {
  initializer,
  forecastEvents,
  showSavedWeatherEvent,
  deleteSavedWeather,
  markScaryWeather,
};
