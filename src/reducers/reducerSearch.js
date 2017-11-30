import {
	SEARCH_RESULT,
	EMPTY_RESULT
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SEARCH_RESULT: {
			const { results, page, total_pages, total_results } = action.payload;
			return {
				...state,
				results,
				total_results,
				page,
				total_pages
			};
		}
		case EMPTY_RESULT:
			return {
				...state,
				results: undefined,
				total_results: 0,
				page: 0,
				total_pages: 0
			}
		default:
			return state;
	}
};