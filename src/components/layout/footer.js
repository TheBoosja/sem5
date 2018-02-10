import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';

import tmdb from '../../img/tmdb.svg';
import logo from '../../img/logo.svg';
import { title } from '../../info';

class Footer extends Component {
	render() {
		return (
			<Navbar staticTop className='footer'>
				<Navbar.Collapse>
					<Navbar.Text><small>{title}</small></Navbar.Text>
					<Nav pullRight>
						<NavItem href='https://reactjs.net/'><Image className='logo' src={logo} responsive /></NavItem>
						<NavItem href='https://www.tmdb.org'><Image className='logo' src={tmdb} responsive /></NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Footer;