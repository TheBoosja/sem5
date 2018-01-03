import React, { Component } from 'react';
import SignIn from './signin';
import SignUp from './signup';

class AuthPage extends Component {
	render() {
		return (
			<div>
				<SignIn {...this.props} />
				<hr />
				<SignUp {...this.props} />
			</div>
		);
	}
}

export default AuthPage;