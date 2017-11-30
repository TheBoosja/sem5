import axios from 'axios';
import { SEARCH_RESULT, EMPTY_RESULT } from './types';

const ROOT_URL = 'https://api.themoviedb.org/3/search/tv?api_key=e88fbcbf7600bbb2fbc4469a5d75ca09&language=en-US';

export function search(query) {
	return (dispatch) => {
		const url = `${ROOT_URL}&query=${query}&page=1`;

		axios(url).then(res => {
			dispatch({
				type: SEARCH_RESULT,
				payload: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	};
}

export function emptyResults() {
	return {
		type: EMPTY_RESULT
	};
}