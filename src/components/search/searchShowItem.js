import React, { Component } from 'react';
// import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NoPoster from '../../img/no_poster_w154.png';

class SearchShowItem extends Component {
	render() {
		const { show: {
			id,
			poster_path,
			name,
			original_name,
			first_air_date } } = this.props;

		const source = poster_path ?
			`https://image.tmdb.org/t/p/w300${poster_path}` :
			NoPoster;

		// DELETE
		console.log(this.props.show);

		return (
			<Link to={`/tv/${id}`} className='search__link'>
				<figure className='search__figure'>
					<img src={source} alt={`${name} poster`} className='search__img' />
				</figure>
				<div className="search__details">
					<h4 className='heading-3 search__title'>{name}</h4>
					{original_name !== name &&
						<p className='search__orig'>OT: {original_name}</p>}
					<p className='search__date'>
						{first_air_date ? moment(first_air_date).format('YYYY') : 'N/A'}
					</p>
				</div>
			</Link>
		);
	}
}

export default SearchShowItem;