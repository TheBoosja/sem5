import '../css/App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Auth
import fire from '../fire';
import { AUTH_USER } from '../actions/types';
import SignIn from './auth/signin';
import SignOut from './auth/signout';
import SignUp from './auth/signup';
import requireAuth from './auth/require_auth';
// Wrapper
import NavBar from './navbar';
import Footer from './footer';
// Routes
import Home from './home';
import Search from './search';

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

				<Route exact path='/' component={Home} />
				<Route path='/search' component={requireAuth(Search)} />
				<Route path='/signin' component={SignIn} />
				<Route path='/signout' component={SignOut} />
				<Route path='/signup' component={SignUp} />

				<Footer />
			</div>
		);
	}
}

export default App;
