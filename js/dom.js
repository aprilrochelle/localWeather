const currentWeather = (wxObject) => {
  let wxString = '';
  wxString += `<div class="jumbotron col-md-10 col-md-offset-1">`;
  wxString +=   `<div class="row">`;
  wxString +=     `<div class="col-md-4 text-center">`;
  wxString +=       `<h1>${wxObject.name}</h1>`;
  wxString +=       `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Temperature: <span><h3>${wxObject.main.temp.toFixed(0)}&deg;F</h3></span></p>`;
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
  wxString +=     `<button id="day5" class="btn btn-primary btn-md">View 5 Day Forecast</button>`;
  wxString +=   `</div>`;
  wxString += `</div>`;
  printCurrentWx(wxString);
};

const forecast5 = (wxObj) => {
  let wxString = '';
  wxString += `<div class="container-fluid">`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<div class="col-md-10 col-md-offset-1 city-container">`;
  wxString +=       `<h2>${wxObj.city.name}'s 5 Day Forecast</h2>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="row text-center">`;
  wxString +=       `<div class="col-md-10 col-md-offset-1">`;
  wxObj.list.forEach((wx) => {
    if (wx.dt_txt.includes('15:00:00')) {
      wxString += `<div class="col-md-2 wx-card">`;
      wxString +=   `<h4>${wx.dt_txt}</h4>`;
      wxString +=   `<ul class="list-group">`;
      wxString +=     `<li class="list-group-item">${wx.main.temp.toFixed(0)}&deg;F</li>`;
      wxString +=     `<li class="list-group-item">${wx.weather[0].main}</li>`;
      wxString +=     `<li class="list-group-item">Pressure: ${wx.main.pressure}</li>`;
      wxString +=     `<li class="list-group-item">Wind Speed: ${wx.wind.speed}MPH</li>`;
      wxString +=   `</ul>`;
      wxString += `</div>`;
    }
  });
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  printForecast5(wxString);
};

const printCurrentWx = (string) => {
  $('#wxBox').html(string);
};

const printForecast5 = (string) => {
  $('#forecast').html(string);
};

module.exports = {
  currentWeather,
  forecast5,
};
