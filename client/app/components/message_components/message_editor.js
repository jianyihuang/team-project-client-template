import React from 'react';
import {postSchedule} from '../../server';

export class MessageEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			entered_text: '',
	  	author: "",
	    subscriber : "",
	    date : "",
	    time: "",
	    serviceContents: ""
		};
		this.handleMessageSend = this.handleMessageSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleAddSchedule = this.handleAddSchedule.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleSubscriberChange = this.handleSubscriberChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleServiceContentsChange = this.handleServiceContentsChange.bind(this);

	}
	handleMessageSend(event) {
		event.preventDefault();
		this.props.onMessageSend(this.state.entered_text);
		this.setState({
			entered_text: ''
		});

	}

	// Handle add schedule.
	handleAddSchedule(){
      postSchedule(this.state,(userInfo)=>{
        // console.log(JSON.stringify(userInfo));
      });
    }
     handleAuthorChange(event) {
      event.preventDefault();
      var newAuthor = event.target.value;
      this.setState({
        author: newAuthor
      });
    }

    handleSubscriberChange(event) {
      event.preventDefault();
      var newSubscriber = event.target.value;
      this.setState({
        subscriber: newSubscriber
      });
    }

    handleDateChange(event) {
      event.preventDefault();
      var newDate = event.target.value;
      this.setState({
        date: newDate
      });
    }

    handleTimeChange(event) {
      event.preventDefault();
      var newTime = event.target.value;
      this.setState({
        time: newTime
      });
    }

    handleServiceContentsChange(event) {
      event.preventDefault();
      var newServiceContents = event.target.value;
      this.setState({
        serviceContents: newServiceContents
      });
    }
    // End: handleSchedule.
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
	handleKeyUp(event) {
		event.preventDefault();
		if(event.key === "Enter"){
			this.props.onMessageSend(this.state.entered_text);
			this.setState({
				entered_text: ''
			});
		}
	}
	render() {
		return (
			<div>
				<textarea placeholder="Enter text to reply" value={this.state.entered_text} onKeyUp={this.handleKeyUp} onChange={this.handleChange}></textarea>
				<div className="btn-toolbar">
					<div className="input-group">
						<button className="form-control pull-left btn btn-primary" onClick={this.handleMessageSend}>
							<span className="glyphicon glyphicon-pencil"></span>
							Send
						</button>
						<span className="input-group-addon">
							<button className="btn btn-default" data-toggle="modal" data-target="#mySchedule"><span className="glyphicon glyphicon-calendar"></span>Add Appointment</button>
                                <div id="mySchedule" className="modal fade" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <font size="5">Add an appointment </font>
                                            </div>
                                            <div className="modal-body">
                                            	<div className="panel panel-default">
										            <div className= "panel-color">
										              <div className="panel-body">
										                <div className="row">
										                  <div className= "col-xs-3">
										                    <strong>Your First Name (Upper case with first letter)</strong>
										                  </div>
										                  <div className= "col-xs-5">
										                    <div className="input-style">
										                      <input type="text" className="form-control" value={this.state.author} onChange={this.handleAuthorChange}/>
										                    </div>
										                  </div>
										                </div>
										                <hr />
										                <div className="row">
										                  <div className= "col-xs-3">
										                    <strong>Date(e.g. 10/6/2016)</strong>
										                  </div>
										                  <div className= "col-xs-5">
										                    <div className="input-style">
										                      <input type="text" className="form-control" value={this.state.subscriber} onChange={this.handleSubscriberChange} />
										                    </div>
										                  </div>
										                </div>
										                <hr />
										                <div className="row">
										                  <div className= "col-xs-3">
										                    <strong>Service(e.g. CS121)</strong>
										                  </div>
										                  <div className= "col-xs-5">
										                    <div className="input-style">
										                      <input type="text" className="form-control" value={this.state.date} onChange={this.handleDateChange} />
										                    </div>
										                  </div>
										                </div>
										                <hr />
										              <div className="row">
										                    <div className= "col-xs-3">
										                      <strong>Time(e.g. 9AM-12AM)</strong>
										                    </div>
										                    <div className= "col-xs-5">
										                      <div className="input-style">
										                        <input type="text" className="form-control" value={this.state.time} onChange={this.handleTimeChange} />
										                      </div>
										                    </div>
										                  </div>
										                  <hr />
										                  <div className="row">
										              <div className= "col-xs-3">
										              <strong>Subscriber</strong>
										                </div>
										              <div className= "col-xs-5">
										            <div className="input-style">
										                <input type="text" className="form-control" value={this.state.serviceContents} onChange={this.handleServiceContentsChange} />
										            </div>
										              </div>
										            </div>
										          <hr />
										              </div>
										            </div>
										          </div>
                                            </div>
                                            <div className="modal-footer text-center">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleAddSchedule}>Add to Schedule</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
						</span>

					</div>
				</div>
			</div>
			);
	}
}
