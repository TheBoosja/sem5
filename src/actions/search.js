import { SEARCH_RESULT } from './types';

const API_KEY = 'e88fbcbf7600bbb2fbc4469a5d75ca09';
const ROOT_URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US`;

export function search(query) {
	return (dispatch) => {
		const url = `${ROOT_URL}&query=${query}&page=1`;
		fetch(url).then(response => {
			response.json().then(response => {
				dispatch({
					type: SEARCH_RESULT,
					payload: response
				});
			});
		});
	};
}