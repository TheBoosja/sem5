import React, { Component } from 'react';
import moment from 'moment';
import Utility from './utility';
// import NoPoster from '../../img/no_poster_w270.png';

class Episode extends Component {
	render() {
		const {
			name,
			episode_number,
			// still_path,
			overview,
			air_date
		} = this.props.episode;

		const airDate = moment(air_date).format('MMMM Do YYYY');
		// const still = still_path ? `http://image.tmdb.org/t/p/original${still_path}` : NoPoster;

		return (
			<div>
				<h4 className='list-group-item-heading'>({episode_number}) {name} <small><em>{airDate}</em></small></h4>
				<div className='list-group-item-text'>
					<p>{overview}</p>
					<Utility />
				</div>
			</div>
		);
	}
}

export default Episode;