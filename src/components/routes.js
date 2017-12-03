import React, { Component } from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import modalView from './modalView';
import SignIn from './auth/signin';
import SignOut from './auth/signout';
import SignUp from './auth/signup';
// import requireAuth from './auth/requireAuth';
// Routes
import NoMatch from './noMatch.js';
import Home from './home';
import ShowPage from './tv/showPage';

import SearchBar from './search/searchBar';
import SearchList from './search/searchList';
// import Profile from './profile';


class ModalSwitch extends Component {
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

		const modals = (
			<div>
				<Route path='/search' component={modalView(SearchBar)} />
			</div>
		);

		return (
			<div>
				<Switch location={isModal ? this.prevLocation : location}>
					<Route exact path='/' component={Home} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Route path='/signout' component={SignOut} />
					<Route exact path='/tv/:id/:season?' component={ShowPage} />
					<Route exact path='/search' render={() => <Grid><SearchBar /></Grid>} />
					<Route path='/search/:query' component={SearchList} />;
					{/* <Route path='/:user' component={requireAuth(Profile)} /> */}
					<Route component={NoMatch} />
				</Switch>
				{isModal ? modals : null}
			</div>
		);
	}
}

export default ModalSwitch;