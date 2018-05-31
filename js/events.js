const weather = require('./weather');
const dom = require('./dom');

const checkZip = () => {
  const userZip = $('#user-zip').val();
  if (userZip.length === 5 && $.isNumeric(userZip)) {
    weather.getCurrentWeather(userZip)
      .then((results) => {
        dom.currentWeather(results);
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
        dom.forecast5(results);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const initializer = () => {
  validationEvents();
};

module.exports = {
  initializer,
  forecastEvents,
};
