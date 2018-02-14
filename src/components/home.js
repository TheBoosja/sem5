import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div className='home'>
				<header className='home__header'>
					<h1 className='home__title heading-1'>Zibzab</h1>
					<h3 className='home__subtitle heading-3'>Track what you've seen.</h3>
					<Link to='/search' className='home__btn btn'>Log your first TV show now</Link>
				</header>
				<div className='home__images'>
					<img className='home__img home__img--1' src='https://image.tmdb.org/t/p/w300/mWNadwBZIx8NyEw4smGftYtHHrE.jpg' alt='Game of Thrones Poster' />
					<img className='home__img home__img--2' src='https://image.tmdb.org/t/p/w300/dg7NuKDjmS6OzuNy33qt8kSkPA1.jpg' alt='Game of Thrones Poster' />
					<img className='home__img home__img--3' src='https://image.tmdb.org/t/p/w300/qJdfO3ahgAMf2rcmhoqngjBBZW1.jpg' alt='Game of Thrones Poster' />
					<img className='home__img home__img--4' src='https://image.tmdb.org/t/p/w300/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg' alt='Game of Thrones Poster' />
					<img className='home__img home__img--5' src='https://image.tmdb.org/t/p/w300/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg' alt='Game of Thrones Poster' />
				</div>
			</div>
		);
	}
}

export default Home;