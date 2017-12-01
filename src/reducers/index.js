import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import auth from './reducerAuth';
import search from './reducerSearch';
import tv from './reducerTV';

const rootReducer = combineReducers({
	router,
	form,
	auth,
	search,
	tv
});

export default rootReducer;