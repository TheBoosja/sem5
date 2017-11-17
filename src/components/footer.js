import '../css/footer.css';
import React, { Component } from 'react';
import tmdb from '../tmdb.svg';
import logo from '../logo.svg';
import { title } from '../info';

class Footer extends Component {
	render() {
		return (
			<div className='footer'>
				<footer>
					<small>{title}</small>
					<a href='https://reactjs.net/' className='logo'><img id='react' src={logo} alt='react' /></a>
					<a href='https://www.tmdb.org'><img id='tmdb' src={tmdb} alt='tmdb' /></a>
				</footer>
			</div>
		);
	}
}

export default Footer;