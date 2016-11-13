import React from 'react';

export class MessageEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			entered_text: ''
		};
		this.handleMessageSend = this.handleMessageSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleMessageSend(event) {
		event.preventDefault();
		this.props.onMessageSend(this.state.entered_text);
		this.setState({
			entered_text: ''
		});

	}
	handleChange(event) {
		event.preventDefault();
		this.setState({
			entered_text: event.target.value
		});
	}
	render() {
		return (
			<div>
				<textarea placeholder="Enter text to reply" value={this.state.entered_text} onChange={this.handleChange}></textarea>
				<div className="btn-toolbar">
					<div className="input-group">
						<button className="form-control btn btn-primary" onClick={this.handleMessageSend}>
							<span className="glyphicon glyphicon-pencil"></span>
							Send
						</button>
						<span className="input-group-addon">
							<input type="checkbox" name="enter_send" />
							Press Enter to send.
						</span>
						<div className="btn-group pull-right footer-btn">
							<button className="btn btn-default"><span className="glyphicon glyphicon-file"></span>Add File</button>
							<button className="btn btn-default"><span className="glyphicon glyphicon-calendar"></span>Add Appointment</button>
						</div>
					</div>
				</div>
			</div>
			);
	}
}