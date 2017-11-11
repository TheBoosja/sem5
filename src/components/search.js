import React, { Component } from 'react';
import '../css/search.css';

class Search extends Component {
	render() {
		return (
			<div>
				<h3>Search bar:</h3>
				<input className='search' type='text' placeholder='Search' />
			</div>
		);
	}
}

export default Search;