import React from 'react';

export class MessageEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			entered_text: '',
			is_checked: true
		};
		this.handleMessageSend = this.handleMessageSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEnterSelected = this.handleEnterSelected.bind(this);
		this.handleCheckClicked = this.handleCheckClicked.bind(this);
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
	handleDateTimeChanged(event) {
		event.preventDefault();
		var value = event.target.value;
		console.log((new Date(value)).getTime());
	}
	handleCheckClicked(event) {
		event.preventDefault();
		this.setState({
			is_checked: !this.state.is_checked
		});
	}
	handleClickChanged(event){
		event.preventDefault();		
		this.setState({is_checked: !this.state.is_checked});	
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
							<input type="checkbox" name="enter_send" checked={this.state.is_checked} onClick={this.handleCheckClicked} onChange={this.handleClickChanged} />
							Press Enter to send.
						</span>
						<div className="btn-group pull-right footer-btn">
							<button className="btn btn-default" data-toggle="modal" data-target="#mySchedule"><span className="glyphicon glyphicon-calendar"></span>Add Appointment</button>
                                <div id="mySchedule" className="modal fade" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Specify a date and time</h4>
                                            </div>
                                            <div className="modal-body">
                                            	Create an appoinment at :: <input type="datetime-local" onChange={this.handleDateTimeChanged}name="bdaytime"/>                                                                          
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.addNewParticipant}>Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}