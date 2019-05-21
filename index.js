const express = require('express');

const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodeErr = require('node-err');
const cors = require('cors');

const router = require('./routes');
const { CORS, ERRORS, MONGO_URI } = require('./config');
const errHandler = require('./common/errors');
const { passportInit } = require('./common/passport');

nodeErr.setup({ responses: ERRORS.responses });
passportInit(app);

app.use(cors(CORS));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/app/build`));

app.use(router);
app.use(errHandler);

const port = process.env.PORT || 5000;
server.listen(port);
console.log('lisenting on port', port);
