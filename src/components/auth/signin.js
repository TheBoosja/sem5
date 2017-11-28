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
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		this.props.signInUser({ email, password, from });
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
					{this.renderAlert()}
					<FormGroup>
						<Col smOffset={2} sm={8}>
							<Button type='submit'>Sign In</Button>
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
		errors.email = 'Enter your email, please';
	}

	// Password
	if (!fields.password) {
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