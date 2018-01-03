import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
	render() {
		const { authenticated } = this.props;

		return (
			<Navbar inverse staticTop>
				<Navbar.Header>
					<Navbar.Brand>
						<NavLink exact to='/' id='home' activeClassName='active'>Home</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						{authenticated && <LinkContainer to='/profile'><NavItem>Profile</NavItem></LinkContainer>}
						{/* Search */}
						<LinkContainer to={{ pathname: '/search', state: { modal: true } }}>
							<NavItem>Search</NavItem>
						</LinkContainer>
					</Nav>
					<Nav pullRight>
						{!authenticated ?
							<LinkContainer to={{ pathname: '/signin', state: { modal: true, from: this.props.location } }}>
								<NavItem>Sign In</NavItem>
							</LinkContainer>
							:
							<LinkContainer to='/signout'><NavItem>Sign Out</NavItem></LinkContainer>}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

function mapStateToProps({ auth: { authenticated } }) {
	return { authenticated };
}

export default withRouter(connect(mapStateToProps)(NavBar));