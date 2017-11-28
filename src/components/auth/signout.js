import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Grid } from 'react-bootstrap';

class SignOut extends Component {
	componentWillMount() {
		this.props.signOutUser();
	}

	render() {
		return (
			<Grid>
				<h2>Sorry to see you go...</h2>
			</Grid>
		);
	}
}

export default connect(null, actions)(SignOut);