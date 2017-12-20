import React, { Component } from 'react';
import moment from 'moment';
import Utility from './utility';
// import NoPoster from '../../img/no_poster_w270.png';

class Episode extends Component {
	render() {
		const { id, episode: {
				name,
				episode_number: episode,
				season_number: season,
				still_path: img,
				overview,
				air_date
			}
		} = this.props;

		const airDate = moment(air_date).format('MMMM Do YYYY');
		// const still = still_path ? `http://image.tmdb.org/t/p/original${still_path}` : NoPoster;

		return (
			<div>
				<h4 className='list-group-item-heading'>({episode}) {name} <small><em>{airDate}</em></small></h4>
				<div className='list-group-item-text'>
					<p>{overview}</p>
					<Utility 
						target={{
							id,
							season,
							episode,
							name,
							img
						}} />
				</div>
			</div>
		);
	}
}

export default Episode;