import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import modalView from '../routes/modalView';
import SignOut from '../auth/signout';
import AuthPage from '../auth/authPage';
import requireAuth from '../auth/requireAuth';
// Routes
import NoMatch from '../routes/noMatch.js';
import Home from '../home';
import ShowPage from '../tv/showPage';
import Log from '../tv/log';

import Search from '../search';
import SearchList from '../search/searchList';
import Profile from '../profile';


class Routes extends Component {
	constructor(props) {
		super(props);

		this.prevLocation = this.props.location;
	}

	componentWillUpdate(nextProps) {
		const { location } = this.props;

		if (nextProps.history.action !== 'POP' &&
			(!location.state || !location.state.modal)) {
			this.prevLocation = this.props.location;
		}
	}

	render() {
		const { location } = this.props;
		const isModal = !!(
			location.state &&
			location.state.modal &&
			this.prevLocation !== location
		);

		const modals = <div>
				<Route path='/signin' component={modalView(AuthPage)} />
				<Route path='/search' component={modalView(Search)} />
				<Route path='/tv/:id/:season?/:episode?/log' component={modalView(Log)} />
			</div>;

		return (
			<div className='content'>
				<Switch location={isModal ? this.prevLocation : location}>
					<Route exact path='/' component={Home} />
					<Route path='/signin' component={AuthPage} />
					<Route path='/signout' component={SignOut} />
					<Route exact path='/tv/:id' component={ShowPage} />
					<Route path='/search' component={Search} />
					<Route path='/search/:query' component={SearchList} />;
					<Route path='/profile/:user?' component={requireAuth(Profile)} />
					<Route component={NoMatch} />
				</Switch>
				{isModal ? modals : null}
			</div>
		);
	}
}

export default Routes;