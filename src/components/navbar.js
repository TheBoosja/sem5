import '../css/navbar.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
	renderAuthLinks() {
		return !this.props.authenticated
			? [ <NavLink to='/signin' id='signin' activeClassName='active' key={0}>Sign In</NavLink>,
				<NavLink to='/signup' id='signup' activeClassName='active' key={1}>Sign Up</NavLink> ]
			: [ <NavLink to='/profile' id='profile' activeClassName='active' key={0}>Profile</NavLink>,
				<NavLink to='/signout' id='signout' activeClassName='active' key={1}>Sign Out</NavLink> ];
	}

	render() {
		return (
			<div className='navbar'>
				<NavLink exact to='/' id='home' activeClassName='active'>Home</NavLink>
				{this.renderAuthLinks()}
				<NavLink to='/search' id='search' activeClassName='active'>Search</NavLink>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default withRouter(connect(mapStateToProps)(NavBar));