const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

let hereIsTheUpsideDown;
switch(process.env.UPSIDEDOWN_MODE) {
  case 'true':
    hereIsTheUpsideDown = true
    break;
  case 'false':
    hereIsTheUpsideDown = false
    break;
  default:
    hereIsTheUpsideDown = true
};

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(3000, () => {
  console.log('Escutando na porta 3000');
});
