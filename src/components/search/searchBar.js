import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/search';
// import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	// renderField(field) {
	// 	return (
	// 		<FormGroup bsSize='large'>
	// 			<FormControl {...field.input} placeholder={field.label} autoFocus />
	// 		</FormGroup>
	// 	);
	// }

	onFormSubmit({ query }) {
		if (query) {
			// this.setState({
			// 	query,
			// 	redirectToSearchResult: true
			// });
			this.props.history.push(`${this.props.match.url}/${query}`);
		}
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onFormSubmit)}
				className='search__form'>
				<Field
					name='query'
					component='input'
					className='search__input'
					label='Search'
					placeholder='Search' />
			</form>
		);
	}
}

export default withRouter(
	reduxForm({
		form: 'search'
	})(connect(null, actions)(SearchBar)));