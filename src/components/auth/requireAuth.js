import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
	class Authentication extends Component {
		render() {
			return (!this.props.authenticated)
				? <Redirect to={{ pathname: '/signin', state: { from: this.props.location } }} />
				: <ComposedComponent {...this.props} />;
		}
	}

	function mapStateToProps({ auth: { authenticated }}) {
		return { authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}