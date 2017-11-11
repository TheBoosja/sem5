import React, { Component } from 'react';
import tmdb from '../TMDB.svg';

class Footer extends Component {
	render() {
		return (
			<footer>
				<img height={100} src={tmdb} alt='tmdb' />
			</footer>
		);
	}
}

export default Footer;