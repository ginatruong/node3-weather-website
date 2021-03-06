const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d2686746879a77fefdde814aec3e24d3/${latitude},${longitude}`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out. The high today is ${
          body.daily.data[0].temperatureHigh
        }. The low today is ${body.daily.data[0].temperatureLow}. There is a ${
          body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
