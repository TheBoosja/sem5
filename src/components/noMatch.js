import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

export default class NoMatch extends Component {
	render() {
		return (
			<Grid>
				<h2>404</h2>
				<h4>Doesn't look like anything to me.</h4>
				<h5> - Westworld</h5>
			</Grid>
		);
	}
}