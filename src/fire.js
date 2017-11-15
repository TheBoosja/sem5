import * as firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyDUysToslMYSrFNQ8FWiXdPKPbvBVijXgA', 
	authDomain: 'sem5-4199d.firebaseapp.com',
	databaseURL: 'https://sem5-4199d.firebaseio.com',
	projectId: 'sem5-4199d',
	storageBucket: 'sem5-4199d.appspot.com', 
	messagingSenderId: '765890159974'
};
var fire = firebase.initializeApp(config);

export default fire;