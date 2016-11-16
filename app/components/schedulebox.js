import React from 'react';
import {deleteSchedule} from '../server';

export class Schedulebox extends React.Component {
	constructor(props){
		super(props);
		this.state = this.props
	}

	handleDeleteSchedule(clickEvent) {
		clickEvent.preventDefault();
		if(clickEvent.button === 0) {
			deleteSchedule(1,this.props.id,()=>{
				this.props.refresh;
			});
		}
	}

	render() {
		return (
				<div className="col-md-3 text-center">
			<div className="panel panel-default whole-tab">
				<div className="panel-body">
					<span className = "tab-title">{this.props.firstName}</span>
							<br /><span className= "taken-by">{this.props.postDate}</span><br />
							<span className = "tab-subject">{this.props.serviceContent}</span>
							<br /><span className = "regular-text">{this.props.startTime} - {this.props.endTime}</span><br />
							<span className = "taken-by">APPOINTMENT WITH</span>
							<br /><span className = "taken-by">{this.props.party}</span><br />
							<hr />
							<button type="button" className="btn btn-primary completed-button">
								<a href="#" onClick= {(e) => this.handleDeleteSchedule(e)}>
								{this.props.completed}</a>
							</button>
							</div>
							</div>
						</div>
			);
	}
}
