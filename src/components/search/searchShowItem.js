import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NoPoster from '../../img/no_poster_w154.png';

class SearchShowItem extends Component {
	render() {
		const { show: { id, poster_path, name, first_air_date } } = this.props;

		const source = poster_path ?
			`https://image.tmdb.org/t/p/w154${poster_path}` :
			NoPoster;

		return (
			<Link to={`/tv/${id}`}>
				<Image src={source} />
				<h4>{name}</h4>
				<p>{moment(first_air_date).format('YYYY')}</p>
			</Link>
		);
	}
}

export default SearchShowItem;