import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyDUysToslMYSrFNQ8FWiXdPKPbvBVijXgA', 
	authDomain: 'sem5-4199d.firebaseapp.com',
	databaseURL: 'https://sem5-4199d.firebaseio.com',
	projectId: 'sem5-4199d',
	storageBucket: 'sem5-4199d.appspot.com', 
	messagingSenderId: '765890159974'
};
const fire = firebase.initializeApp(config);

export const auth = fire.auth();
export const firestore = fire.firestore();
export default fire;