import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

class EpisodeList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentWillMount() {
		const { tvId, seasonNum } = this.props;
		this.props.getSeason(tvId, seasonNum);
	}

	componentWillUpdate({ tvId, seasonNum }) {
		if (seasonNum !== this.props.seasonNum) {
			this.props.getSeason(tvId, seasonNum);
		}
	}

	renderEpisodes(episodes) {
		const { tvId, seasonNum } = this.props;

		return episodes.map(({ name, overview, episode_number }, i) => 
			<ListGroupItem
				key={i} 
				header={`(${episode_number}) ${name}`} 
				href={`/tv/${tvId}/${seasonNum}/${i+1}`}>
				{overview}
			</ListGroupItem>
		);
	}

	render() {
		if (this.props.season) {
			const {
				overview,
				episodes
			} = this.props.season;

			return (
				<div>
					{/* {poster_path &&
						<Col md={3}>
							<Image src={`http://image.tmdb.org/t/p/w154${poster_path}`} alt='Poster' />
						</Col>}
					<Col>
						<p>{moment(air_date).format('MMM YYYY')}</p>
						<p>{overview}</p>
					</Col> */}
					<Col md={12}>
						<ListGroup>
							{overview && <ListGroupItem><em>{overview}</em></ListGroupItem>}
							{this.renderEpisodes(episodes)}
						</ListGroup>
					</Col>
				</div>
			);
		}
		else {
			return <div>Loading...</div>;
		}
	}
}

function mapStateToProps({ tv }) {
	return {
		tvId: tv.show.id,
		season: tv.season
	};
}

export default connect(mapStateToProps, actions)(EpisodeList);