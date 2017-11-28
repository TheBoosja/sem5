import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/search';
import { Form, FormGroup, Col, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			redirectToSearchResult: false
		};
	}

	renderField(field) {
		return (
			<FormGroup bsSize='large'>
				<Col smOffset={2} sm={8}>
					<FormControl {...field.input} placeholder={field.label} />
				</Col>
			</FormGroup>
		);
	}

	onFormSubmit({ query }) {
		if (query)
			this.setState({
				query,
				redirectToSearchResult: true
			});
	}

	render() {
		const { handleSubmit } = this.props;

		if (!this.state.redirectToSearchResult) {
			return (
				<Form inline onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
					<Field
						label='Search'
						name='query'
						component={this.renderField} />
				</Form>
			);
		}
		else {
			return <Redirect to={`/search/${this.state.query}`} />;
		}
	}
}

export default reduxForm({
	form: 'search'
})(connect(null, actions)(SearchBar));