// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
// Middleware
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/app';

const history = createHistory();
const middleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(middleware, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App store={store} />
		</ConnectedRouter>
	</Provider>
	, document.getElementById('root')
);
registerServiceWorker();
