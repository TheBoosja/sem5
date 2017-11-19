import '../../css/searchItem.css';
import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		const { show } = this.props;

		let thumbnail = <img alt='empty' />;
		if (show.poster_path) {
			thumbnail = <img src={`http://image.tmdb.org/t/p/w154${show.poster_path}`} alt={show.name} />;
		}

		return (
			<li className='searchItem'>
				{thumbnail}
				<h3>{show.name}</h3>
				<p>{show.first_air_date}</p>
			</li>
		);
	}
}

export default ShowItem;