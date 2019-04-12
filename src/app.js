const path = require('path'); //core node module before npm modules to stay organize
const express = require('express');
//library for node.js //framework -express is a function
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/* MUST USE ABSOLUTE PATH*/
console.log(__dirname); /*src directory*/
// console.log(__filename); /*app.js*/
console.log(
  path.join(__dirname, '../public')
); /*fx ---../.. OR ../ => SRC JOINS -OUTPUT PUBLIC */

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); /*app.use */
const viewsPath = path.join(
  __dirname,
  '../templates/views'
); /*customize views folder*/
const partialsPath = path.join(__dirname, '../templates/partials');

// app.com
// app.com/help
// app.com/about

// app.set -key value to help view dynamic pages
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); /* TEMPLATE HBS VIEWS*/
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
//express.static function passing its return value to the file you want to use -overrides APP.GET('/') ROUTE

/* 4/8 - APP.USE - IF USES HTML PAGE, IT'LL RENDER IF YOU GO TO LINK /ABOUT.HTML HELP.HTML WITHOUT USING THE ROUTE APP.GET('/ABOUT')  --THIS IS FOR APP.USE THAT OVERRIDES AND LINK HAS .HTML PAGE INSTEAD ---APP.GET(/ROUTEPATH INSTEAD OF ABOUT.HTML)*/

//route, function on what to do with route and what to send back(object from incoming request, response)
/* USES APP.USE INSTEAD BC BELOW WILL NOT RUN IF USE APP.USE*/
// app.get('', (req, res) => {
//   // send something back to the requestor from browser
//   // npm request library --- return from code
//   res.send('<h1>Weather</h1>');
// });

/*USE APP.USE INSTEAD -LOOK ABOVE)*/
// app.get('/help', (req, res) => {
//   res.send([
//     {
//       name: 'Andrew',
//       age: 27
//     }
//   ]);
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About page</h1>');
// });

/* '' - route, 'index' - name of file.html */
/* request is an object, respond with */
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  }); /*name of view - index.hbs*/
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gina Truong'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Look up this page',
    title: 'Help',
    name: 'Gina Truong'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
  // res.send([
  //   {
  //     forecast: 'It is a sunday day.'
  //   },
  //   {
  //     location: 'Plano, TX'
  //   },
  //   {
  //     address: req.query.address
  //   }
  // ]);
});

app.get('/products', (req, res) => {
  // console.log(req.query);
  //return stops fx execution
  // can only send once res.send by using return once for error
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Gina Truong',
    errorMessage: 'Help article not found.'
  });
}); /*/help/test - returns this */

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Gina Truong',
    errorMessage: 'Page not found.'
  });
});

// run-start server - use this method listen to listen to a specific port
// 3000 is not default, it's to listen and view from local dev
//(port, and function)

// node src/app.js
// server never closes - gotta quit ctrl C
// start server, tell express to listen for requests (process.env.PORT = 3000, process.env.IP -CLOUD9, CALLBACKFUNCTION)
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});

/* colt steel STAR OR SPLAT ROUTER - do not put it first - the order of routes MATTER ---IT OVERRIDES ALL THE ROUTES, BETTER TO PUT AT THE END*/

/* app.get("/r/:subredditName" -PATTERN) */
/* : ANYTHING || ANY NAME ELSE AFTER ENDING R MATCHES -freewriting pattern 
WWW.REDDIT.COM/R/PUPPIES
R/SUBSANDWICH
R/BURGERS
*/

/*INDEX.HTML APP.USE - ABOUT.HTML */
/* APP.GET - ROUTE AND SEND */
/* HBS - APP.GET -RENDER ABOUT.HBS -NO EXT NEEDED */
/*HTML FILE {{}} EXPRESS */
