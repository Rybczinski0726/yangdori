'use strict';

const express = require('express');
const schedule = require('node-schedule-tz');

const apiRouter = express.Router();

let cups = 0;
let lipbalms = 0;

const simpleText = (text) => {
	return {
		text: text
	}	
};

apiRouter.post('/dailyPromise', (req, res) => {
    let text = '';
    switch (req.body.intent.name) {
        case '물 마시기':
            cups++;
            text = `${cups}잔 마셨다요!`;
            break;

        case '물':
            text = `${cups}잔 마셨다요!`;
            break;

        case '립밤 바르기':
            lipbalms++;
            text = `${lipbalms}번 발랐다요!`;
            break;

        case '립밤':
            text = `${lipbalms}번 발랐다요!`;
            break;
    }
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: simpleText(`지금까지 ${text}`)
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

const scheduleForInitialization = () => {
	const hours = 1;
	const minutes = 0;
	var date = new Date();
	date.setUTCHours(hours - 9); //-9 defines the UTC time offset for a particular timezone
	date.setUTCMinutes(minutes);

	const rule = new schedule.RecurrenceRule();
	rule.hour = date.getHours();
	rule.minute = date.getMinutes();

	const scheduledJob = schedule.scheduleJob(rule, () => {
		cups = 0;
		lipbalms = 0;
	});
}

module.exports = {
	apiRouter,
	scheduleForInitialization
}