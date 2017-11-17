import '../../css/auth.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
	renderField(field) {
		const { meta: { touched, error }} = field;

		return ( 
			<fieldset>
				<input {...field.input} type={field.type} placeholder={field.label} />
				{touched && error && <div className='error'>{error}</div>}
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
		this.props.signUpUser({ email, password });
	}

	render() {
		const { handleSubmit, submitting } = this.props;

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
				<Field
					label='Confirm Password'
					name='passwordConfirm'
					type='password'
					component={this.renderField} />
				{this.renderAlert()}
				<button action='submit' disabled={submitting}>Sign Up</button>
			</form>
		);
	}
}

function validate(fields) {
	const errors = {};

	// Email
	if (!fields.email) {
		errors.email = 'Enter email, please!';
	}
	else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields.email)) {
		errors.email = 'Enter a valid email, please!';
	}
	// Passwords match?
	if (fields.password !== fields.passwordConfirm) {
		errors.password = 'Passwords don\'t match';
	}
	// Password
	if (!fields.password) {
		errors.password = 'Enter password, please!';
	}
	else if (fields.password.length < 6) {
		errors.password = 'Password must be 6+ characters.';
	}
	// Password Confirmation
	if (!fields.passwordConfirm) {
		errors.passwordConfirm = 'Enter password confirmation, please!';
	}
	
	return errors;
}

function mapStateToProps({ auth }) {
	return { errorMessage: auth.error };
}

export default reduxForm({
	form: 'signup',
	validate
})(connect(mapStateToProps, actions)(SignUp));