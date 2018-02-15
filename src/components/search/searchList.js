import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/search';
// import {
// 	Grid,
// 	Col,
// 	Clearfix,
// 	ListGroup
// } from 'react-bootstrap';

import SearchShowItem from './searchShowItem';

class SearchList extends Component {
	constructor(props) {
		super(props);
		
		this.handleQuery.bind(this);
	}

	handleQuery(query) {
		if (query) {
			this.props.search(query);
		}
	}

	componentWillMount() {
		const { query } = this.props.match.params;

		this.handleQuery(query);
	}

	componentWillUnmount() {
		this.props.emptyResults();
	}

	componentWillUpdate({ match: { params: { query } } }) {
		const oldQuery = this.props.match.params.query;

		if (query !== oldQuery) {
			this.props.emptyResults();
			this.handleQuery(query);
		}
	}

	renderList() {
		return this.props.shows.map((show, i) => {
			const elements = [
				// <Col sm={6} md={3} lg={2} key={i}>
					<SearchShowItem show={show} key={i++} />
				// </Col>
			];

			// if (i % 6 === 0)
			// 	elements.push(<Clearfix visibleLgBlock key={i + 1} />);
			// else if (i % 4 === 0)
			// 	elements.push(<Clearfix visibleMdBlock key={i + 1} />);
			// else if (i % 2 === 0)
			// 	elements.push(<Clearfix visibleSmBlock key={i + 1} />);

			return elements;
		});
	}

	render() {
		if (this.props.shows) {
			return (
				<div className='search__list'>
					<h3 className='heading-3 search__result-text'>
						Results: {this.props.total_results}
					</h3>
					{this.renderList()}
				</div>
			);
		}
		else {
			return (
				<h3 className='heading-3'>Loading...</h3>
			);
		}
	}
}

function mapStateToProps({ search: { results, total_results } }) {
	return {
		shows: results,
		total_results
		// page,
		// total_pages
	};
}

export default connect(mapStateToProps, actions)(SearchList);