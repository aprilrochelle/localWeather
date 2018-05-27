const weather = require('./weather');

const checkZip = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const userZip = $('#user-zip').val();
      if (userZip.length === 5 && $.isNumeric(userZip)) {
        weather.showWeather(userZip);
      } else {
        alert('Please enter a 5-digit zip code.');
      }
    }
  });
};

const initializer = () => {
  checkZip();
};

module.exports = {
  initializer,
};
