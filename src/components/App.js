import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Auth
import fire from '../fire';
import { AUTH_USER } from '../actions/types';
// Wrapper
import NavBar from './navbar';
import Footer from './footer';
import Routes from './routes';

class App extends Component {
	componentWillMount() {
		this.removeListenser = fire.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.store.dispatch({ type: AUTH_USER });
			}
		});
	}

	componentWillUnmount() {
		this.removeListenser();
	}

	render() {
		return (
			<div className="App">
				<NavBar />

				<Route component={Routes} />

				<Footer />
			</div>
		);
	}
}

export default App;
