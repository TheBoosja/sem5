import { 
	GET_WATCHED
} from '../actions/types';

export default (state = { watched: [], logs: [] }, { type, payload }) => {
	switch (type) {
		case GET_WATCHED:
			return {
				...state,
				watched: payload
			};
		default:
			return state;
	}
}