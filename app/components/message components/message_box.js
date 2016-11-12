import React from 'react';
import {Message} from './message';

export default MessageBox from React.Component {
	render() {
		return (
			<div class="col-xs-8">
				<div class="panel panel-default">
					<div class="panel-body">
						<ul class="media-list chat-box">
							{/*List of Messages will go in here.*/}
						</ul>
					</div>
					<div class="panel-footer">
						<textarea placeholder="Enter text to reply"></textarea>
						<div>
							<div class="btn-toolbar">
								<div class="input-group">
									<button class="form-control btn btn-primary">
										<span class="glyphicon glyphicon-pencil"></span>
										Send
									</button>
									<span class="input-group-addon">
										<input type="checkbox" name="enter_send">
										Press Enter to send.
									</span>
									<div class="btn-group pull-right footer-btn">
										<button class="btn btn-default"><span class="glyphicon glyphicon-file"></span>Add File</button>
										<button class="btn btn-default"><span class="glyphicon glyphicon-calendar"></span>Add Appointment</button>
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