import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
	ListGroup,
	ListGroupItem,
	ButtonGroup,
	ToggleButtonGroup,
	ToggleButton
} from 'react-bootstrap';
import Episode from './episode';
import Utility from './utility';

class Seasons extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSeason: 0
		};

		this.onChangeSeason = this.onChangeSeason.bind(this);
	}

	onChangeSeason(selected) {
		const selectedSeason = selected.length > 0 ? selected.pop() : 0;
		this.setState({ selectedSeason });
		this.props.emptySeason();

		if (selectedSeason) {
			this.props.getSeason(this.props.id, selectedSeason);
		}
	}

	renderSeasonItems(noOfSeasons) {
		const seasons = [];
		for (let i = 0; i < noOfSeasons; i++) {
			seasons.push(
				<ToggleButton value={i + 1} key={i}>Season {i + 1}</ToggleButton>
			);
		}
		return seasons;
	}

	renderSeason() {
		const { id, 
			season: { 
				name,
				overview, 
				episodes,
				season_number: season,
				poster_path: img
			} } = this.props;

		return (
			<ListGroup componentClass='ul'>
				<ListGroupItem>
					<Utility target={{
						id,
						season,
						name,
						img
					}} />
					{overview && <em>{overview}</em>}
				</ListGroupItem>

				{episodes.map((episode, i) =>
					<li key={i}
						className='list-group-item'>
						<Episode id={id} episode={episode} />
					</li>
				)}
			</ListGroup>
		);
	}

	render() {
		return (
			<div className='seasons'>
				<ButtonGroup>
					<ToggleButtonGroup type='checkbox' value={this.state.selectedSeason} onChange={this.onChangeSeason}>
						{this.renderSeasonItems(this.props.noOfSeasons)}
					</ToggleButtonGroup>
				</ButtonGroup>
				{!!this.state.selectedSeason && (this.props.season ? this.renderSeason() : <div>Loading...</div>)}
			</div>
		);
	}
}

function mapStateToProps({ tv }) {
	return {
		tvId: tv.show.id,
		season: tv.season
	};
}

export default connect(mapStateToProps, actions)(Seasons);