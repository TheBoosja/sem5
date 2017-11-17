import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		const { show } = this.props;

		return (
			<li>
				<h3>{show.name}</h3>
				<img src={`http://image.tmdb.org/t/p/w342${show.poster_path}`} alt={show.name} />
				<ul>
					<li>{show.first_air_date}</li>
				</ul>
			</li>
		);
	}
}

export default ShowItem;