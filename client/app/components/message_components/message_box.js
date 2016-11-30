import React from 'react';

export class MessageBox extends React.Component {
	constructor(props) {
		super(props);
		this.clicked = this.clicked.bind(this);
	}
	clicked() {
		this.props.onRecentBoxMsgClicked(this.props.boxId);
	}
	render() {
		return (
				<li className="list-group-item active" onClick={this.clicked}>
					<small>Box Message Id :: {this.props.boxId}</small>
				</li>
			);
	}
}