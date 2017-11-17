import {
	SEARCH_RESULT
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SEARCH_RESULT:
			return { 
				...state,
				results: action.payload.results,
				page: action.payload.page,
				totalResults: action.payload.total_results,
				totalPages: action.payload.total_pages
			};
		default:
			break;
	}
	return state;
};