const currentWeather = (wxObject) => {
  let wxString = '';
  wxString += `<div class="jumbotron col-md-10 col-md-offset-1">`;
  wxString +=   `<div class="row">`;
  wxString +=     `<div class="col-md-4 text-center">`;
  wxString +=       `<h1>${wxObject.name}</h1>`;
  wxString +=       `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Temperature: <span><h3>${wxObject.main.temp.toFixed(0)}</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Conditions: <span><h3>${wxObject.weather[0].main}</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Air Pressure: <span><h3>${wxObject.main.pressure}</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Wind Speed: <span><h3>${wxObject.wind.speed} mph</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=   `</div>`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<button id="5-day" class="btn btn-primary btn-md">View 5 Day Forecast</button>`;
  wxString +=   `</div>`;
  wxString += `</div>`;
  printCurrentWx(wxString);
};

const printCurrentWx = (string) => {
  $('#wxBox').html(string);
};

module.exports = {
  currentWeather,
};
