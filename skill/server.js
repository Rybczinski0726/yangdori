/*eslint no-console: 0*/
"use strict";

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const cors = require('cors');

const api = require('./api/api')

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev', {}));
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.json());
// app.use(cors());
app.use('/api', api);

// app.use(express.static('static'))

const server = app.listen(port, () => {
  console.log(`Yangdori-Bot Skill Server Listening on Port ${port}`);
});