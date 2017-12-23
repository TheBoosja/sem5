import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/utility';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Utility extends Component {
	renderWatchBtn() {
		const { target: { id, season, episode }, watched } = this.props;

		const isWatched = watched.find(w => {
			const seasonMatch = w.season === undefined || w.season === season;
			const episodeMatch = w.episode === undefined || w.episode === episode;
			// ID will always match
			// If season is undefined => whole show has been seen
			// If episode is undefined => whole season/show has been seen

			return seasonMatch && episodeMatch;
		});

		let style = 'default';
		let label = 'Watch';
		let onBtnClick = () => this.props.watch({ id, season, episode });

		if (isWatched) {
			style = 'success';
			label = 'Watched';
			onBtnClick = () => this.props.unWatch({ id, season, episode });
		}

		return <Button bsStyle={style} onClick={onBtnClick} key={0}>{label}</Button>;
	}

	renderLogBtn() {
		const { target: { id, season, episode, name, img }, logs } = this.props;

		const isLogged = logs.find(l => {
			const seasonMatch = l.season === undefined || l.season === season;
			const episodeMatch = l.episode === undefined || l.episode === episode;

			return seasonMatch && episodeMatch;
		});

		let style = 'default';
		let label = 'Log';

		if (isLogged) {
			style = 'success';
			label = 'Logged';
		}

		return (
			<LinkContainer to={{
				pathname: `/tv/${id}/${season}/${episode}/log`,
				state: { modal: true, target: { name, img } }
			}} key={1}>
				<Button bsStyle={style}>
					{label}
				</Button>
			</LinkContainer>
		);
	}

	renderWatchlistBtn() {
		return <Button disabled key={2}>Watchlist</Button>;
	}

	render() {
		const vertical = this.props.vertical ? true : false;

		return (
			<ButtonToolbar>
				<ButtonGroup vertical={vertical} block={vertical}>
					{!this.props.authenticated
					? <Button disabled>Sign in</Button>
					: [
						this.renderWatchBtn(),
						this.renderLogBtn(),
						this.renderWatchlistBtn()
					]}
					<Button disabled>Share</Button>
				</ButtonGroup>
			</ButtonToolbar>
		);
	}
}

function mapStateToProps({ utility: { watched, logs }, auth: { authenticated } }) {
	return { watched, logs, authenticated };
}

export default connect(mapStateToProps, actions)(Utility);