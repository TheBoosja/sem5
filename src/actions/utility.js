import { auth, firestore } from '../fire';
import _ from 'lodash';
import {
	GET_WATCHED
} from './types';

export function getWatched(showId) {
	return dispatch => {
		const uid = auth.currentUser.uid;
		firestore.doc(`users/${uid}`).collection('watched')
			.where('show_id', '==', Number(showId))
			.onSnapshot(snapshot => {
				const watched = snapshot.docs.map(doc => doc.data());
				dispatch({
					type: GET_WATCHED,
					payload: watched
				});
			});
	};
}

export function watch({ id, season, episode }) {
	return () => {
		const watchObj = {
			...id && { show_id: id },
			...season && { season },
			...episode && { episode }
		};
		const uid = auth.currentUser.uid;

		firestore.doc(`users/${uid}`).collection('watched')
			.add(watchObj)
			.catch(error => {
				console.log('watch catched an error:', error);
			});
	};
}

export function unWatch({ id, season, episode }) {
	return () => {
		const uid = auth.currentUser.uid;
		firestore.doc(`users/${uid}`).collection('watched')
			.where('show_id', '==', id)
			.get()
			.then(snapshot => {
				snapshot.docs
					.find(d => {
						const doc = d.data();
						return (
							doc.season === season &&
							doc.episode === episode
						);
					})
					.ref
					.delete();
			});
	};
}

export function log(logData) {
	return () => {
		const cleanLog = _.omitBy(logData, v => v === 'undefined');
		const uid = auth.currentUser.uid;

		firestore.doc(`users/${uid}`).collection('logs')
			.add(cleanLog)
			.catch(error => {
				console.log('log catched an error', error);
			});
	};
}
