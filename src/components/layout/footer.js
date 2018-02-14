import React, { Component } from 'react';

import tmdb from '../../img/tmdb.svg';
import logo from '../../img/logo.svg';
// import { title } from '../../info';

class Footer extends Component {
	render() {
		return (
			<footer className='footer'>
				<p className='footer__text'>&copy; Copyright 2018 by Mathias Iversen</p>
				<a href='https://reactjs.org/' className='footer__link'>
					<img className='footer__img footer__img--1' src={logo} alt='React logo' />
				</a>
				<a href='https://www.tmdb.org' className='footer__link'>
					<img className='footer__img footer__img--2' src={tmdb} alt='TMDb logo' />
				</a>
			</footer>
		);
	}
}

export default Footer;