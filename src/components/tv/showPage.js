import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { getWatched } from '../../actions/utility';

import moment from 'moment';
import {
	Grid,
	Col,
	Image,
	PageHeader
} from 'react-bootstrap';
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
				<Grid>
					<Col md={3}>
						<Image src={renderSource(poster_path, 342)} responsive />
					</Col>
					<Col md={9}>
						<PageHeader>{name} <small>({airDate})</small></PageHeader>
						<Col md={9}>
							{originalName}
							<p>{overview}</p>
						</Col>
						<Col md={3}>
							<Utility target={{
								id,
								name,
								img: poster_path
							}} vertical />
						</Col>
						<Col md={12}>
							<Seasons id={id} noOfSeasons={number_of_seasons} />
						</Col>
					</Col>
					{backdrop_path && <Col md={12}><Image src={renderSource(backdrop_path, 1280)} responsive /></Col>}
				</Grid>
			);
		}
		else {
			return <Grid><h3>Loading...</h3></Grid>;
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