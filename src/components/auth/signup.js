import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';
import {
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Col,
	Button,
	Alert
} from 'react-bootstrap';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.colWidth = 9;

		this.renderField = this.renderField.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.authError('');
	}

	renderField({ name, label, input, type, meta: { touched, error } }) {
		return (
			<FormGroup controlId={name}>
				<Col componentClass={ControlLabel} sm={2}>{label}</Col>
				<Col sm={this.colWidth}>
					<FormControl
						{...input}
						type={type}
						placeholder={label} />
					{/* Input error message */}
					{touched && error && <div className='error'>{error}</div>}
				</Col>
			</FormGroup>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<Col smOffset={2} sm={this.colWidth}>
					<Alert bsStyle='danger'>
						{this.props.errorMessage}
					</Alert>
				</Col>
			);
		}
	}

	onFormSubmit({ email, password }) {
		const { from } = this.props.location.state;
		const prevLocation = from.pathname !== '/signout' ? from : { from: { pathname: '/profile' } };

		this.props.signUpUser({ email, password, prevLocation });
	}

	render() {
		const { handleSubmit } = this.props;

		if (!this.props.authenticated) {
			return (
				<Form onSubmit={handleSubmit(this.onFormSubmit)} horizontal>
					<h3>Sign Up</h3>
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
					<FormGroup>
						<Col smOffset={2} sm={this.colWidth}>
							<Button type='submit'>
								Sign Up
							</Button>
						</Col>
					</FormGroup>
				</Form>
			);
		}
		else {
			return <Redirect to={'/profile'} />;
		}
	}
}

function validate({ email, password, passwordConfirm }) {
	const errors = {};

	// Email
	if (!email) {
		errors.email = 'Enter an email, please!';
	}
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Enter a valid email, please!';
	}
	// Passwords match?
	if (password !== passwordConfirm) {
		errors.password = 'Passwords don\'t match';
	}
	// Password
	if (!password) {
		errors.password = 'Enter a password, please!';
	}
	else if (password.length < 6) {
		errors.password = 'The password must be 6+ characters.';
	}
	// Password Confirmation
	if (!passwordConfirm) {
		errors.passwordConfirm = 'Confirm your password, please!';
	}

	return errors;
}

function mapStateToProps({ auth: { authenticated, error } }) {
	return { authenticated, errorMessage: error };
}

export default reduxForm({
	form: 'signup',
	validate
})(connect(mapStateToProps, actions)(SignUp));