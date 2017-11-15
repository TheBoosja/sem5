import fire from '../fire';
import { push } from 'react-router-redux';

import { 
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from './types';

export function signUpUser({ email, password }) {
	return (dispatch) => {
		fire.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				// Change auth state
				dispatch({ type: AUTH_USER });
				// Redirect
				dispatch(push('/'));
			})
			.catch(error => {
				dispatch(authError(error));
			});
	};
}

export function signInUser({ email, password }) {
	return (dispatch) => {
		// Authenticate with firebase
		fire.auth().signInWithEmailAndPassword(email, password)
			// Success
			.then(() => {
				// Change auth state
				dispatch({ type: AUTH_USER });
				// Redirect
				dispatch(push('/'));
			})
			// Error
			.catch(error => {
				dispatch(authError(error));
			});
	};
}

export function signOutUser() {
	return (dispatch) => {
		fire.auth().signOut()
		.then(() => {
			dispatch({ type: UNAUTH_USER });
		})
		.catch(error => {
			dispatch(authError(`Unable to sign out: ${error}`));
		});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}