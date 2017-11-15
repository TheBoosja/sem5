import '../css/content.css';
import '../css/search.css';
import React, { Component } from 'react';

class Search extends Component {
	render() {
		return (
			<div className='content'>
				<h3>Search bar:</h3>
				<input className='search' type='text' placeholder='Search' />
			</div>
		);
	}
}

export default Search;