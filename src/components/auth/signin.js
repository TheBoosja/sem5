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

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.authError('');
	}

	renderField(field) {
		const { meta: { touched, error } } = field;

		return (
			<FormGroup controlId={field.name}>
				<Col componentClass={ControlLabel} sm={2}>{field.label}</Col>
				<Col sm={8}>
					<FormControl
						{...field.input}
						type={field.type}
						placeholder={field.label} />
					{/* Input error message */}
					{touched && error && <div className='error'>{error}</div>}
				</Col>
			</FormGroup>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<Col smOffset={2} sm={8}>
					<Alert bsStyle='danger'>
						{this.props.errorMessage}
					</Alert>
				</Col>
			);
		}
	}

	onFormSubmit({ email, password }) {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		this.props.signInUser({ email, password, from });
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<Grid>
				<Form onSubmit={handleSubmit(this.onFormSubmit)} horizontal>
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
					<FormGroup>
						<Col smOffset={2} sm={8}>
							<Button type='submit'>
								Sign In
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</Grid>
		);
	}
}

function validate({ email, password }) {
	const errors = {};

	// Email
	if (!email) {
		errors.email = 'Enter your email, please';
	}
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Enter a valid email, please!';
	}

	// Password
	if (!password) {
		errors.password = 'Enter your password, please!';
	}

	return errors;
}

function mapStateToProps({ auth }) {
	return { errorMessage: auth.error };
}

export default reduxForm({
	form: 'signin',
	validate
})(connect(mapStateToProps, actions)(SignIn));