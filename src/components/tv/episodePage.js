import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class EpisodePage extends Component {
	render() {
		return (
			<Grid>
				<div>Hello their... You are watching episode {this.props.match.params.episode}.</div>
			</Grid>
		);
	}
}

export default EpisodePage;