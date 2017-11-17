import '../../css/search.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/search';

import SearchList from './searchList';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			query: ''
		};
	}

	handleChange(event) {
		this.setState({ query: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.search(this.state.query);
	}
	
	render() {
		return (
			<div className='content'>
				<form onSubmit={this.handleSubmit.bind(this)} className='search'>
					<input
						name='query'
						type='text'
						placeholder='Search'
						value={this.state.query}
						onChange={this.handleChange.bind(this)} />
				</form>
				<SearchList query={this.state.query} />
			</div>
		);
	}
}

export default connect(null, actions)(Search);