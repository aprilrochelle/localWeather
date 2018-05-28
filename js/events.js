const weather = require('./weather');

const checkZip = () => {
  const userZip = $('#user-zip').val();
  if (userZip.length === 5 && $.isNumeric(userZip)) {
    weather.showWeather(userZip);
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
  const zipCode = $('#user-zip').val();
  $('#day5').on('click', () => {
    weather.showForecast(zipCode);
  });
};

const initializer = () => {
  validationEvents();
};

module.exports = {
  initializer,
  forecastEvents,
};
