import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';
import { 
	Grid, 
	Form, 
	FormGroup, 
	FormControl, 
	ControlLabel, 
	Col, 
	Button, 
	Alert 
} from 'react-bootstrap';

class SignUp extends Component {
	componentWillUnmount() {
		this.props.authError('');
	}

	renderField(field) {
		const { meta: { touched, error } } = field;

		return (
			<FormGroup controlId={field.name}>
				<Col componentClass={ControlLabel} sm={2}>{field.label}</Col>
				<Col sm={8}>
					<FormControl {...field.input} type={field.type} placeholder={field.label} />
					{touched && error && <div className='error'>{error}</div>}
				</Col>
			</FormGroup>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<Col smOffset={2} sm={8}>
					<Alert bsStyle='danger'>{this.props.errorMessage}</Alert>
				</Col>
			);
		}
	}

	onFormSubmit({ email, password }) {
		this.props.signUpUser({ email, password });
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<Grid>
				<Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} horizontal>
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
						<Col smOffset={2} sm={8}>
							<Button type='submit'>Sign Up</Button>
						</Col>
					</FormGroup>
				</Form>
			</Grid>
		);
	}
}

function validate(fields) {
	const errors = {};

	// Email
	if (!fields.email) {
		errors.email = 'Enter an email, please!';
	}
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields.email)) {
		errors.email = 'Enter a valid email, please!';
	}
	// Passwords match?
	if (fields.password !== fields.passwordConfirm) {
		errors.password = 'Passwords don\'t match';
	}
	// Password
	if (!fields.password) {
		errors.password = 'Enter a password, please!';
	}
	else if (fields.password.length < 6) {
		errors.password = 'The password must be 6+ characters.';
	}
	// Password Confirmation
	if (!fields.passwordConfirm) {
		errors.passwordConfirm = 'Confirm your password, please!';
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