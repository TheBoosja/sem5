import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/utility';
import _ from 'lodash';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import {
	Form,
	FormGroup,
	FormControl,
	Button,
	Col,
	Clearfix,
	Image,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton
} from 'react-bootstrap';

class Log extends Component {
	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.renderRating = this.renderRating.bind(this);
	}

	onFormSubmit(log) {
		const { id, season, episode } = this.props.match.params;

		if (_.isEmpty(log)) {
			console.log('is empty', log);
			// this.props.watch({ id, season, episode });
		}
		else {
			console.log('full with info', log);
			this.props.log({ id, season, episode, ...log });
		}
	}

	render() {
		const {
			handleSubmit,
			location: {
				state: {
					target: { name, img }
				}
			}
		} = this.props;

		const source = img && `http://image.tmdb.org/t/p/w185${img}`;

		return (
			<Form onSubmit={handleSubmit(this.onFormSubmit)} horizontal>
				<Col md={3}><Image src={source} alt='poster' responsive /></Col>
				<Col md={9}>
					<h3>{name}</h3>
					<Field
						label='Date [MM/DD/YYYY]'
						name='date'
						component={this.renderDate} />
					<Field
						label='Rate'
						name='rating'
						component={this.renderRating} />
					<Field
						label='Review'
						name='review'
						component={this.renderReview} />
					<FormGroup>
						<Button type='submit'>Save</Button>
					</FormGroup>
				</Col>
				<Clearfix />
			</Form>
		);
	}

	renderDate({ name, input, label }) {
		return (
			<FormGroup controlId={name}>
				<FormControl {...input} placeholder={label} />
			</FormGroup>
		);
	}

	renderRating({ input }) {
		let i = 10;
		const radios = new Array(i);
		while (i > 0) {
			radios[i] = <ToggleButton value={i} key={i}>{i--}</ToggleButton>;
		}

		return (
			<FormGroup>
				<ButtonToolbar>
					<ToggleButtonGroup {...input} type='radio'>
						{radios}
					</ToggleButtonGroup>
					<Button onClick={() => this.props.change('log', 'rating', '')}>&#x2716;</Button>
				</ButtonToolbar>
			</FormGroup>
		);
	}

	renderReview({ name, input, label }) {
		return (
			<FormGroup controlId={name}>
				<FormControl {...input} componentClass='textarea' placeholder={label} />
			</FormGroup>
		);
	}
}

function mapStateToProps(state) {
	const rating = formValueSelector('log')(state, 'rating');
	return { rating };
}

export default reduxForm({
	form: 'log'
})(connect(mapStateToProps, { change, ...actions })(Log));