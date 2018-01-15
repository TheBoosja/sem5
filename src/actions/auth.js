import { auth } from '../fire';
import { push } from 'react-router-redux';

import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from './types';

export function signUpUser({ email, password, from }) {
	return (dispatch) => {
		// Create User in Firebase
		auth.createUserWithEmailAndPassword(email, password)
			.then(() => {
				// Change auth state
				dispatch({ type: AUTH_USER });
				// Redirect
				dispatch(push(from));
			})
			.catch(error => {
				dispatch(authError(`Unable to sign up user: ${error.message}`));
			});
	};
}

export function signInUser({ email, password, from }) {
	return (dispatch) => {
		// Authenticate with Firebase
		auth.signInWithEmailAndPassword(email, password)
			// Success
			.then(() => {
				// Change auth state
				dispatch({ type: AUTH_USER });
				// Redirect
				dispatch(push(from));
			})
			.catch(error => {
				dispatch(authError(`Unable to sign in user: ${error.message}`));
			});
	};
}

export function signOutUser() {
	return (dispatch) => {
		auth.signOut()
			.then(() => {
				dispatch({ type: UNAUTH_USER });
			})
			.catch(error => {
				dispatch(authError(`Unable to sign out: ${error.message}`));
			});
	};
}

function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}