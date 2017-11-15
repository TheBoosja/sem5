import '../css/navbar.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
	renderLinks() {
		if (!this.props.authenticated) {
			return [
				<NavLink to='/signin' id='signin' activeClassName='active' key={0}>Sign In</NavLink>,
				<NavLink to='/signup' id='signup' activeClassName='active' key={1}>Sign Up</NavLink>
			];
		}
		else {
			return <NavLink to='/signout' id='signout' activeClassName='active'>Sign Out</NavLink>;
		}
	}

	render() {
		return (
			<div className='navbar'>
				<NavLink exact to='/' className='home-link' activeClassName='active'>Home</NavLink>
				<NavLink to='/search' className='search-link' activeClassName='active'>Search</NavLink>
				{this.renderLinks()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(NavBar);