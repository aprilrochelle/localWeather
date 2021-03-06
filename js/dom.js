const moment = require('../lib/node_modules/moment/moment.js');

const currentWeather = (wxObject, whereToPrint) => {
  let wxString = '';
  wxString += `<div class="jumbotron col-md-10 col-md-offset-1 weather">`;
  wxString +=   `<div class="row">`;
  wxString +=     `<div class="col-md-4 text-center">`;
  wxString +=       `<h1 class="cityName">${wxObject.name}</h1>`;
  wxString +=       `<h4 class="date-time">${moment().format('MMMM Do YYYY, hh:mm:ss a')}</h4>`;
  wxString +=       `<img data-icon="${wxObject.weather[0].icon}"  src="http://openweathermap.org/img/w/${wxObject.weather[0].icon}.png">`;
  wxString +=       `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Temperature: <span><h3 class="temp">${wxObject.main.temp.toFixed(0)}&deg;F</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Conditions: <span><h3 class="conditions">${wxObject.weather[0].main}</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Air Pressure: <span><h3 class="pressure">${wxObject.main.pressure}</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="col-md-2">`;
  wxString +=       `<p>Wind Speed: <span><h3 class="wind">${wxObject.wind.speed} mph</h3></span></p>`;
  wxString +=     `</div>`;
  wxString +=   `</div>`;
  wxString +=   `<div class="row text-center saveCurrentRow">`;
  wxString +=     `<button type="button" class="saveWx btn btn-warning btn-sm">
  <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> Save
</button>`;
  wxString +=   `</div>`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<div class="btn-group btn-group-md" role="group">`;
  wxString +=       `<button id="day3" class="btn btn-success btn-md">3 Day Forecast</button>`;
  wxString +=       `<button id="day5" class="btn btn-primary btn-md">5 Day Forecast</button>`;
  wxString +=     `</div>`;
  wxString +=   `</div>`;
  wxString += `</div>`;
  printToDom(wxString, whereToPrint);
};

const forecast5 = (wxObj, whereToPrint) => {
  let wxString = '';
  wxString += `<div class="container-fluid">`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<div class="col-md-10 col-md-offset-1 city-container">`;
  wxString +=       `<h2>5 Day Forecast</h2>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="row text-center">`;
  wxString +=       `<div class="col-md-10 col-md-offset-1">`;
  wxObj.list.forEach((wx) => {
    if (wx.dt_txt.includes('15:00:00')) {
      wxString += `<div class="col-md-2 wx-card-5 weather">`;
      wxString +=   `<h4 class="cityName">${wxObj.city.name}</h4>`;
      wxString +=   `<h4 class="date-time">${moment(wx.dt_txt).format('MMMM Do YYYY, hh:mm:ss a')}</h4>`;
      wxString +=       `<img data-icon="${wx.weather[0].icon}" src="http://openweathermap.org/img/w/${wx.weather[0].icon}.png">`;
      wxString +=   `<ul class="list-group">`;
      wxString +=     `<li class="list-group-item"><span class="temp">${wx.main.temp.toFixed(0)}&deg;F</span></li>`;
      wxString +=     `<li class="list-group-item"><span class="conditions">${wx.weather[0].main}</span></li>`;
      wxString +=     `<li class="list-group-item">Pressure: <span class="pressure">${wx.main.pressure}</span></li>`;
      wxString +=     `<li class="list-group-item">Wind Speed: <span class="wind">${wx.wind.speed} mph</li>`;
      wxString +=   `</ul>`;
      wxString +=   `<button type="button" class="saveWx btn btn-warning btn-sm">
      <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> Save
    </button>`;
      wxString += `</div>`;
    }
  });
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  printToDom(wxString, whereToPrint);
};

const forecast3 = (wxObj, whereToPrint) => {
  let wxString = '';
  wxString += `<div class="container-fluid">`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<div class="col-md-10 col-md-offset-1 city-container">`;
  wxString +=       `<h2>3 Day Forecast</h2>`;
  wxString +=     `</div>`;
  wxString +=     `<div class="row text-center">`;
  wxString +=       `<div class="col-md-10 col-md-offset-1">`;
  for (let i = 5; i < 22; i += 8) {
    wxString += `<div class="col-md-4 wx-card weather">`;
    wxString +=   `<h4 class="cityName">${wxObj.city.name}</h4>`;
    wxString +=   `<h4 class="date-time">${moment(wxObj.list[i].dt_txt).format('MMMM Do YYYY, hh:mm:ss a')}</h4>`;
    wxString +=       `<img data-icon="${wxObj.list[i].weather[0].icon}" src="http://openweathermap.org/img/w/${wxObj.list[i].weather[0].icon}.png">`;
    wxString +=   `<ul class="list-group">`;
    wxString +=     `<li class="list-group-item"><span class="temp">${wxObj.list[i].main.temp.toFixed(0)}&deg;F</span></li>`;
    wxString +=     `<li class="list-group-item"><span class="conditions">${wxObj.list[i].weather[0].main}</span></li>`;
    wxString +=     `<li class="list-group-item">Pressure: <span class="pressure">${wxObj.list[i].main.pressure}</span></li>`;
    wxString +=     `<li class="list-group-item">Wind Speed: <span class="wind">${wxObj.list[i].wind.speed} mph</span></li>`;
    wxString +=   `</ul>`;
    wxString +=   `<button type="button" class="saveWx btn btn-warning btn-sm">
    <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> Save
  </button>`;
    wxString += `</div>`;
  }
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  printToDom(wxString, whereToPrint);
};

const savedWxForecasts = (wxArray, whereToPrint) => {
  let wxString = '';
  wxString += `<div class="container-fluid">`;
  wxString +=   `<div class="row text-center">`;
  wxString +=     `<div class="col-md-10 col-md-offset-1">`;
  wxArray.forEach((wx) => {
    if (wx.isScary) {
      wxString += `<div class="col-md-4 wx-card weather scary" data-firebase-id="${wx.id}">`;
    } else if (!wx.isScary) {
      wxString += `<div class="col-md-4 wx-card weather" data-firebase-id="${wx.id}">`;
    }
    wxString +=   `<h4 class="cityName">${wx.city}</h4>`;
    wxString +=   `<h4 class="date-time">${wx.date}</h4>`;
    wxString +=   `<img data-icon="${wx.img}" src="http://openweathermap.org/img/w/${wx.img}.png">`;
    wxString +=   `<ul class="list-group">`;
    wxString +=     `<li class="list-group-item"><span class="temp">${wx.temperature}</span></li>`;
    wxString +=     `<li class="list-group-item"><span class="conditions">${wx.conditions}</span></li>`;
    wxString +=     `<li class="list-group-item">Pressure: <span class="pressure">${wx.pressure}</span></li>`;
    wxString +=     `<li class="list-group-item">Wind Speed: <span class="wind">${wx.windSpeed}</li>`;
    wxString +=   `</ul>`;
    wxString +=   `<div class="btn-group" role="group">`;
    wxString +=   `<button type="button" class="deleteWx btn btn-success btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
    wxString +=   `<button type="button" class="scary-btn btn btn-danger btn-sm"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Scary Weather</button>`;
    wxString += `</div>`;
    wxString += `</div>`;
  });
  wxString += `</div>`;
  wxString += `</div>`;
  wxString += `</div>`;
  printToDom(wxString, whereToPrint);
};

const printToDom = (string, whereToPrint) => {
  $(`#${whereToPrint}`).html(string);
};

module.exports = {
  currentWeather,
  forecast5,
  forecast3,
  savedWxForecasts,
};
