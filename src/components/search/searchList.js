import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/search';

import ShowItem from './showItem';

class SearchList extends Component {
	renderList() {
		let i = 0;
		return this.props.shows.map(show => <ShowItem show={show} key={i++} />);
	}

	render() {
		if (this.props.shows) {
			return [
				<h3 key={0}>Results: {this.props.totalResults}</h3>,
				<ul className='searchList' key={1}>
					{this.renderList()}
				</ul>
			];
		}
		else {
			return (
				<div>
					<h3>Search for a tv show...</h3>
				</div>
			);
		}
	}
}

function mapStateToProps({ search }) {
	return {
		shows: search.results,
		totalResults: search.totalResults
	};
}

export default connect(mapStateToProps, actions)(SearchList);