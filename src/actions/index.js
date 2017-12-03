import axios from 'axios';
import {
	GET_SHOW,
	GET_SEASON,
	EMPTY_SHOW,
	EMPTY_SEASON
} from './types';


export function getShow(id) {
	return get({
		url: `https://api.themoviedb.org/3/tv/${id}`,
		type: GET_SHOW
	});
}

export function getSeason(tvId, seasonNum) {
	return get({
		url: `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNum}`, 
		type: GET_SEASON
	});
}

function get({ url, type }) {
	return (dispatch) => {
		url += '?api_key=e88fbcbf7600bbb2fbc4469a5d75ca09&language=en-US';

		axios(url).then(({ data }) => {
			dispatch({
				type,
				payload: data
			});
		}).catch(error => {
			console.log(error);
		});
	};
}

export function emptyShow() {
	return {
		type: EMPTY_SHOW
	};
}

export function emptySeason() {
	return {
		type: EMPTY_SEASON
	};
}