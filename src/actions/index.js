import axios from 'axios';
import { 
	GET_SHOW, 
	GET_SEASON,
	EMPTY_DATA 
} from './types';


export function getShow(id) {
	return (dispatch) => {
		const url = `https://api.themoviedb.org/3/tv/${id}?api_key=e88fbcbf7600bbb2fbc4469a5d75ca09&language=en-US`;

		axios(url).then(res => {
			dispatch({
				type: GET_SHOW,
				payload: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	};
}

export function getSeason(tvId, seasonNum) {
	return (dispatch) => {
		const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNum}?api_key=e88fbcbf7600bbb2fbc4469a5d75ca09&language=en-US`;
		axios(url).then(res => {
			dispatch({
				type: GET_SEASON,
				payload: res.data
			});
		});
	};
}

export function emptyData() {
	return {
		type: EMPTY_DATA
	};
}