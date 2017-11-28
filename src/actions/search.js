import { SEARCH_RESULT } from './types';

const ROOT_URL = 'https://api.themoviedb.org/3/search/tv?api_key=e88fbcbf7600bbb2fbc4469a5d75ca09&language=en-US';

export function search(query) {
	return (dispatch) => {
		const url = `${ROOT_URL}&query=${query}&page=1`;

		fetch(url).then(res => {
			if (res.ok) {
				return res.json();
			}
			else {
				console.log(res.status, res.statusText);
			}
		}).then(res => {
			dispatch({
				type: SEARCH_RESULT,
				payload: res
			});
		});
	};
}