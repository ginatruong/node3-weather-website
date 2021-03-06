const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZ2luYS10cnVvbjkiLCJhIjoiY2p0cjcwb2hoMG16bzN6bzNsenlka2F4cCJ9.lRiEB275shMNW3-AaFf0uQ';
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connecto to location service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
// export default geocode or export geocode as default;
