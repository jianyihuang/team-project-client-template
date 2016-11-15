import React from 'react';
import {unixTimeToString} from '../../util';

export class scheduleBox extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-3 text-center">
			<div className="panel panel-default whole-tab">
				<div className="panel-body">
					<span className = "tab-tittle">{this.props.firstName}</span>
							<br /><span className= "taken-by">{this.props.postDate}</span><br />
							<span className = "tab-subject">{this.props.serviceContent}</span>
							<br /><span className = "regular-text">{this.props.startTime} - {this.props.endTime}</span><br />
							<span className = "taken-by">APPOINTMENT WITH</span>
							<br /><span className = "taken-by">{this.props.party}</span><br />
							<hr />
							<button type="button" className="btn btn-primary completed-button">
								{this.props.completed}
							</button>
							</div>
							</div>
						</div>
					</div>
			);
	}
}