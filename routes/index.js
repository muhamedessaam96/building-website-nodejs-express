const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (request, response) => {
    const artwork = await speakersService.getAllArtwork();
    const topSpeakers = await speakersService.getList();
    // console.log(topSpeakers);
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`Number of visit ${request.session.visitcount}`);

    // response.render('pages/index', { pageTitle: 'welcome' });
    response.render('layout', { pageTitle: 'welcome', template: 'index', topSpeakers, artwork });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
