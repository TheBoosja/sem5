import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';
import Search from '../components/search';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Search />, div);
});