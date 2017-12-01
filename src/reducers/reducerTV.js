import { 
	GET_SHOW,
	GET_SEASON,
	GET_EPISODE,
	EMPTY_DATA 
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
		case GET_EPISODE:
			return {
				...state,
				episode: payload
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