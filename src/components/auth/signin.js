import '../../css/auth.css';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {
	renderField(field) {
		return (
			<fieldset>
				<input {...field.input} type={field.type} placeholder={field.label} />
			</fieldset>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className='error'>
					{this.props.errorMessage}
				</div>
			);
		}
	}

	componentWillUnmount() {
		this.props.authError('');
	}

	onFormSubmit({ email, password }) {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		this.props.signInUser({ email, password, from });
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} className='content auth'>
				<Field
					label='Email'
					name='email'
					type='email'
					component={this.renderField} />
				<Field
					label='Password'
					name='password'
					type='password'
					component={this.renderField} />
				{this.renderAlert()}
				<button action='submit'>Sign In</button>
			</form>
		);
	}
}

function mapStateToProps({ auth }) {
	return { errorMessage: auth.error };
}

export default reduxForm({
	form: 'signin'
})(
	connect(mapStateToProps, actions)(SignIn)
);