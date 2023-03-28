const request = require("request");
const apikey = "4fb0c183445889635485192a601d1929";
// const response = `${res.body.list[0].weather[0].description}.It is currently ${res.body.list[0].main.temp} degrees out. There is a ${res.body.list[0].pop}% chance of rain.`;
const forecaste = (lat, lon, callback) => {
  request(
    {
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`,
      json: true,
    },
    (err, { body }) => {
      if (err) {
        callback("Unable to connect to Weather service", undefined);
      } else if (body.message) {
        callback(undefined, res.body);
      } else {
        callback(undefined, {
          description: body.list[0].weather[0].description,
          main: body.list[0].main,
          // full: body,
          weather: body.list[0].weather,
          res: `${body.list[0].weather[0].description}.It is currently ${
            body.list[0].main.temp
          } degrees out. There is a ${body.list[0].pop * 100}% chance of rain.`,
        });
      }
    },
  );
};

module.exports = forecaste;
