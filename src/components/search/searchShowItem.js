import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NoPoster from '../../img/no_poster_w154.png';

class SearchShowItem extends Component {
	render() {
		const { show } = this.props;

		const source = show.poster_path ?
			`http://image.tmdb.org/t/p/w154${show.poster_path}` :
			NoPoster;

		return (
			<Link to={`/shows/${show.id}`}>
				<Image src={source} />
				<h4>{show.name}</h4>
				<p>{show.first_air_date}</p>
			</Link>
		);
	}
}

export default SearchShowItem;