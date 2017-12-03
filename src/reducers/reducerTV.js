import { 
	GET_SHOW,
	GET_SEASON,
	EMPTY_SHOW,
	EMPTY_SEASON 
} from '../actions/types';

export default (state = {}, { type, payload }) => {
	switch (type) {
		case GET_SHOW:
			return {
				...state,
				show: payload
			};
		case GET_SEASON:
			return {
				...state,
				season: payload
			};
		case EMPTY_SHOW:
			return {
				...state,
				show: undefined
			};
		case EMPTY_SEASON:
			return {
				...state,
				season: undefined
			};
		default:
			return state;
	}
};