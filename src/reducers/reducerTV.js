import { 
	GET_SHOW,
	GET_SEASON,
	EMPTY_DATA 
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_SHOW:
			return {
				...state,
				show: action.payload
			};
		case GET_SEASON:
			return {
				...state,
				season: action.payload
			};
		case EMPTY_DATA:
			return {
				...state,
				show: undefined,
				season: undefined
			};
		default:
			return state;
	}
};