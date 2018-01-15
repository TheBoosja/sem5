const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.logMeta = functions.firestore
	.document('users/{userId}/logs/{logId}')
	.onWrite(event => {
		// ... code here
		var logTarget = event.data.data();

		var metalog = {
			id: logTarget.id
		};
		if (logTarget.season) metalog.season = logTarget.season;
		if (logTarget.episode) metalog.episode = logTarget.episode;

		console.log(metalog);

		return 0;
	});