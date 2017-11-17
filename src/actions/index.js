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
				dispatch(authError(error.message));
			});
	};
}

export function signInUser({ email, password, from }) {
	return (dispatch) => {
		// Authenticate with firebase
		fire.auth().signInWithEmailAndPassword(email, password)
			// Success
			.then(() => {
				// Change auth state
				dispatch({ type: AUTH_USER });
				// Redirect
				dispatch(push(from));
			})
			// Error
			.catch(error => {
				if (error.code === 'auth/user-not-found'){
					dispatch(authError('Invalid credentials'));
				}
				else {
					dispatch(authError(error.message));
				}
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
			dispatch(authError(`Unable to sign out: ${error.message}`));
		});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}