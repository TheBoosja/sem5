import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Jumbotron } from 'react-bootstrap';

class SignOut extends Component {
	componentWillMount() {
		this.props.signOutUser();

		// CLEAR UTILITY DATA FROM APP-STATE
	}

	render() {
		return (
			<Jumbotron>
				<h1>Farewell</h1>
				<p>You have been signed out...</p>
			</Jumbotron>
		);
	}
}

export default connect(null, actions)(SignOut);