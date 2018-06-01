const weather = require('./weather');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

const checkZip = () => {
  const userZip = $('#user-zip').val();
  if (userZip.length === 5 && $.isNumeric(userZip)) {
    weather.getCurrentWeather(userZip)
      .then((results) => {
        dom.currentWeather(results, 'wxBox');
        $('#forecast').html('');
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
    };
    firebaseApi.saveWeatherForecast(weatherObj);
  });
};

const initializer = () => {
  validationEvents();
  saveWeatherEvent();
};

module.exports = {
  initializer,
  forecastEvents,
};
