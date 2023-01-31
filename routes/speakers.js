const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  // router.get('/', async (request, response) => {
  //   const speakers = await speakersService.getList();
  //   return response.json(speakers);
  // });

  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    const artwork = await speakersService.getAllArtwork();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    const artwork = await speakersService.getArtworkForSpeaker(request.params.shortname);
    console.log(artwork);
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers-detail',
      speaker,
      artwork,
    });

    // return response.send(`Detail page of ${request.params.shortname}`);
  });
  // router.get('/:shortname', async (request, response) => {
  //   const speakerImg = await speakersService.getAllArtwork(request.params.shortname);
  //   console.log('hhahhaha');
  //   console.log(speakerImg);
  //   response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speakerImg });
  // });

  return router;
};
