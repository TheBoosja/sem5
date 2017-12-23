import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default function (ComposedComponent) {
	class ModalView extends Component {
		constructor(props) {
			super(props);

			this.state = {
				modal: this.props.location.state.modal
			};
		}

		hide() {
			this.setState({ modal: false });
			this.props.history.goBack();
		}

		show() {
			this.setState({ modal: true });
		}

		render() {
			return (
				<Modal show={this.state.modal} onHide={this.hide.bind(this)}>
					<Modal.Body>
						<ComposedComponent {...this.props} />
					</Modal.Body>
				</Modal>
			);
		}
	}

	return ModalView;
}
