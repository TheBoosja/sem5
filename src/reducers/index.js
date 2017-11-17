import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import auth from './reducerAuth';
import search from './reducerSearch';

const rootReducer = combineReducers({
	router,
	form,
	auth,
	search
});

export default rootReducer;