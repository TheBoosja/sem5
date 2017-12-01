import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import { Grid, Col, Image, PageHeader, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import NoPoster from '../../img/no_poster_w270.png';

import EpisodeList from './episodeList.js';

class ShowPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSeason: 0
		};

		this.onChangeSeason = this.onChangeSeason.bind(this);
	}

	componentWillMount() {
		const { id } = this.props.match.params;

		if (id) {
			this.props.getShow(id);
		}
	}

	componentWillUnmount() {
		this.props.emptyData();
	}

	onChangeSeason(selected) {
		this.setState({ selectedSeason: selected.length > 0 ? selected.pop() : 0 });
	}

	renderSeasonItems(number_of_seasons) {
		const seasons = [];
		for (let i = 0; i < number_of_seasons; i++) {
			seasons.push(
				<ToggleButton value={i + 1} key={i}>Season {i + 1}</ToggleButton>
			);
		}
		return seasons;
	}

	renderSeason() {
		return <EpisodeList seasonNum={this.state.selectedSeason} />;
	}

	render() {
		if (this.props.show) {
			const {
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

			const renderSource = (path, size) => path ? `http://image.tmdb.org/t/p/w${size}${path}` : NoPoster;

			return (
				<Grid>
					<Col md={3}>
						<Image src={renderSource(poster_path, 342)} responsive />
					</Col>
					<Col md={9}>
						<PageHeader>{name} <small>({moment(first_air_date).format('YYYY')}{in_production ? '-' : moment(last_air_date).format('-YYYY')})</small></PageHeader>
						{name !== original_name && <p><em>Original name: {original_name}</em></p>}
						<p>{overview}</p>

						<ButtonGroup>
							<ToggleButtonGroup type='checkbox' value={this.state.selectedSeason} onChange={this.onChangeSeason}>
								{this.renderSeasonItems(number_of_seasons)}
							</ToggleButtonGroup>
						</ButtonGroup>
						{this.state.selectedSeason !== 0 && this.renderSeason()}
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

function mapStateToProps({ tv }) {
	// if (tv.show) console.log('mapStateToProps:', tv.show);
	return { show: tv.show };
}

export default connect(mapStateToProps, actions)(ShowPage);