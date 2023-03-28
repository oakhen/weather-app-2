const request = require("request");

const apikey = "4fb0c183445889635485192a601d1929";
const geocode = (adress, callback) => {
  request(
    {
      url: `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        adress,
      )}&limit=3&appid=${apikey}`,
      json: true,
    },
    (err, { body }) => {
      if (err) {
        callback("Unable to connect to location service", undefined);
      } else if (!body.length) {
        callback("Unable to find location try another search", undefined);
      } else {
        callback(undefined, {
          lat: body[0].lat,
          lon: body[0].lon,
          state: body[0].state,
        });
      }
    },
  );
};

module.exports = geocode;
