// const exp = require('constants');
// const { request, response } = require("express");
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');
const { request } = require('http');
const { response } = require('express');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['ssss56541846655', 'lorem2326261335'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUS Meetup';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;

    // console.log(response.locals);
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

// app.get('/', (request, response) => {
//   //   response.sendFile(path.join(__dirname, './static/index.html'));
//   response.render('pages/index', { pageTitle: 'welcome' });
// });

// app.get('/speakers', (request, response) => {
//   response.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.listen(port, () => {
  console.log(`Express listen on port ${port}`);
});
