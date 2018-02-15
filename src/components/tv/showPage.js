import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { getWatched } from '../../actions/utility';

import moment from 'moment';
// import {
// 	Grid,
// 	Col,
// 	Image,
// 	PageHeader
// } from 'react-bootstrap';
import NoPoster from '../../img/no_poster_w270.png';

import Seasons from './seasons';
import Utility from './utility';

class ShowPage extends Component {
	constructor(props) {
		super(props);

		this.getWatched = this.getWatched.bind(this);
	}

	componentWillMount() {
		this.getWatched(this.props.authenticated, true);
	}

	componentWillUpdate(nextProps) {
		this.getWatched(nextProps.authenticated);
	}

	getWatched(auth, shouldGetShow = false) {
		const { id } = this.props.match.params;

		if (id) {
			shouldGetShow && this.props.getShow(id);
			auth && this.props.getWatched(id);
		}
	}

	componentWillUnmount() {
		this.props.emptyShow();
	}

	render() {
		if (this.props.show) {
			const {
				id,
				backdrop_path,
				poster_path,
				name,
				original_name,
				first_air_date,
				in_production,
				last_air_date,
				overview,
				number_of_seasons
			} = this.props.show;

			const renderSource = (path, size) => path ? `https://image.tmdb.org/t/p/w${size}${path}` : NoPoster;

			const firstAirDate = moment(first_air_date).format('YYYY');
			const lastAirDate = in_production ? '-' : moment(last_air_date).format('-YYYY');
			const airDate = firstAirDate + lastAirDate;

			const originalName = name !== original_name &&
				<p><em>Original name: {original_name}</em></p>;

			return (
				<div className='tv'>
					{backdrop_path && 
						<img src={renderSource(backdrop_path, 1280)} alt="Backdrop Image" className="tv__backdrop"/>}
					<img src={renderSource(poster_path, 342)} alt='Poster' className='tv__poster' />

					<h1 className="tv__title heading-1">
						{name} <small className="tv__subtitle">({airDate})</small>
					</h1>
					{originalName}
					<p className='tv__overview'>{overview}</p>

					<Utility target={{
						id,
						name,
						img: poster_path
					}} vertical />

					<Seasons id={id} noOfSeasons={number_of_seasons} />
				</div>
			);
		}
		else {
			return <h3 className='heading-3'>Loading...</h3>;
		}
	}
}

function mapStateToProps({
	tv: { show },
	auth: { authenticated }
}) {
	// if (tv.show) console.log('mapStateToProps:', tv.show);
	return { show, authenticated };
}

export default connect(mapStateToProps, { ...actions, getWatched })(ShowPage);