import React, { Component } from 'react';
import SearchBar from './searchBar';
import SearchList from './searchList';
import { Route } from 'react-router-dom';

class Search extends Component {
	render() {
		const { match } = this.props;

		return (
			<div className='search'>
				<SearchBar />
				<Route path={`${match.url}/:query`} component={SearchList} />
			</div>
		);
	}
}

export default Search;