import '../css/app.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Auth
import fire from '../fire';
import { AUTH_USER } from '../actions/types';
import SignIn from './auth/signin';
import SignOut from './auth/signout';
import SignUp from './auth/signup';
import requireAuth from './auth/requireAuth';
// Wrapper
import NavBar from './navbar';
import Footer from './footer';
// Routes
import NoMatch from './noMatch.js';
import Home from './home';
import Search from './search';
import Profile from './profile';

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

				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signout' component={SignOut} />
					<Route path='/signup' component={SignUp} />
					<Route path='/search' component={Search} />
					<Route path='/:user' component={requireAuth(Profile)} />
					<Route component={NoMatch} />
				</Switch>

				<Footer />
			</div>
		);
	}
}

export default App;
