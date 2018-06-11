const {setUid,} = require('./firebaseApi');
const {showSavedWeather,} = require('./events');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      $('#auth').addClass('hide');
      $('#auth-link').addClass('hide');
      $('#saved-link, #logout').removeClass('hide');
      $('#zip-submit').removeClass('hide');
      $('#savedForecasts').removeClass('hide');
      showSavedWeather();
    } else {
      $('#auth').removeClass('hide');
      $('#auth-link').removeClass('hide');
      $('#saved-link, #logout').addClass('hide');
      $('#zip-submit, #user-msg').addClass('hide');
      $('#savedForecasts').addClass('hide');
    };
  });
};

module.exports = {
  checkUserLoginStatus,
};
