import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import '../css/App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default App;
