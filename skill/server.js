/*eslint no-console: 0*/
"use strict";

const express = require('express');
const logger = require('morgan');
// const cors = require('cors');

const api = require('./api/api')

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev', {}));
app.use(express.json());
// app.use(cors());
app.use('/api', api.apiRouter);

// app.use(express.static('static'))

const server = app.listen(port, () => {
  api.scheduleForInitialization();
  console.log(`Yangdori-Bot Skill Server Listening on Port ${port}`);
});