import axios from 'axios';
import {
	GET_SHOW,
	GET_SEASON,
	GET_EPISODE,
	EMPTY_DATA
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

export function getEpisode({ tvId, seasonNum, episodeNum }) {
	return get({
		url: `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNum}/episode/${episodeNum}`,
		type: GET_EPISODE
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

export function emptyData() {
	return {
		type: EMPTY_DATA
	};
}