const fs = require("fs");
const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3001;

/* paths for configs */
const publicDirectory = path.resolve(__dirname, "../public");
const viewPath = path.join(__dirname, "../templetes/views");
const componentsPath = path.join(__dirname, "../templetes/components");

/* handlebar and view engine location  */
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(componentsPath);

/* static public directory */
app.use(express.static(publicDirectory)); //this is serving public folder
/* and page handling will be done my hbs pages */

/* ye bata toh raha ki kya kya kaise hota  */

/* home */
app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    heading: "welcome to my Home Page!",
    credit: "Created by Ceribro Fonudation.",
    adress: req.query.adress,
  });
});

/* help */
app.get("/help", (req, res) => {
  res.render("help", {
    help: "contact us for more help..",
    title: "Help",
  });
});

/* about */
app.get("/about", (req, res) => {
  res.render("about", {
    message: "example",
    title: "About",
  });
});
/* weather */
app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({ error: "you must provide adress" });
  }
  geocode(
    req.query.adress,
    (error, { lat = 0, lon = 0, state = "mars" } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(lat, lon, (error, forecaste) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            location: `${req.query.adress} ${state}`,
            forecaste: forecaste.res,
            weather: forecaste.main,
            adress: req.query.adress,
            lat,
            lon,
          });
        });
      }
    },
  );
});

/* example */

app.get("/products", (req, res) => {
  /* express koi v chiz humko provide nai karta jisse ki hum force kar sake ki koi string provided hona 
  chahiye so huko javascripts ke methods ka istemaal karna hota hai.  */
  if (!req.query.search) {
    return res.send("please provide searh key");
  }

  res.send([
    {
      product: "message",
    },
  ]);
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "404 page not found",
  });
});

/* port to listen 3000 */
app.listen(port, () => {
  console.log("server is running on port 3000");
});

/* sql stands for structured database language */

/* nosql not only structured database language  */

/* mongodb me atleast humko crud operation dekhna hai. creat read upload delete */

