import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/search';
// import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			redirectToSearchResult: false
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
				<form
					onSubmit={handleSubmit(this.onFormSubmit)}
					className='search'>
					<Field
						name='query'
						component='input'
						className='search__input'
						label='Search'
						placeholder='Search' />
				</form>
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