import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
	render() {
		const { authenticated } = this.props;

		return (
			<nav className='nav'>
				<ul className='nav__list'>
					<li className='nav__item'>
						<NavLink
							exact 
							to='/' 
							activeClassName='nav__active' 
							className='nav__link'>
							Home
						</NavLink>
					</li>

					{authenticated && 
						<li className='nav__item'>
							<NavLink 
								to='/profile' 
								activeClassName='nav__active' 
								className='nav__link'>
								Profile
							</NavLink>
						</li>}
					
					<li className='nav__item'>
						<NavLink
							to='/search'
							activeClassName='nav__active'
							className='nav__link'>
							Search
						</NavLink>
					</li>

					{!authenticated ?
						<li className='nav__item--auth'>
							<NavLink 
								to={{ pathname: '/signin', state: { modal: true, from: this.props.location } }}
								activeClassName='nav__active'
								className='nav__link'>
								Sign In
							</NavLink>
						</li>
						:
						<li className='nav__item--auth'>
							<NavLink 
								to='/signout'
								activeClassName='nav__active'
								className='nav__link'>
								Sign Out
							</NavLink>
						</li>}
				</ul>
			</nav>
		);
	}
}

function mapStateToProps({ auth: { authenticated } }) {
	return { authenticated };
}

export default withRouter(connect(mapStateToProps)(NavBar));