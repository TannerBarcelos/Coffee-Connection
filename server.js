const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to DB'),
);

// Middlewares - these run for every request
const { setUpSessionMiddleware } = require('./routes/sessionMiddleware');

// Establishes a new user session
app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: 'auth-token',
  }),
);
app.use(setUpSessionMiddleware); // initial middleware that runs whenever someone gets onto the site
app.use(morgan('combined')); //logging middleware - will log all incoming requests
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true })); // enables cors for resource sharing from client to this backend service
app.use(express.static(path.join(__dirname, './client/dist'))); // serve our built dist files for heroku

// using the router middleware to send routes elsewhere for app wide routing
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/userRoutes'));
app.use('/bookmarks', require('./routes/shopBookmarks'));

// to handle page regresh issues
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/dist/index.html'));
});

// parses geolocation
app.post('/geo', async (req, res) => {
  const { latitude, longitude } = req.body;
  const shops = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application-json',
      },
    },
  );
  res.send(await shops.json());
});

// parses location entries
app.post('/locations', async (req, res) => {
  const { city } = req.body;
  const shops = await fetch(
    `https://api.yelp.com/v3/businesses/search?location=${city}&term=coffee`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application-json',
      },
    },
  );
  res.send(await shops.json());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`),
);
