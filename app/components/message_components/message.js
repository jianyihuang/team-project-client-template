import React from 'react';

export class Message extends React.Component {
	render() {
		return (
			<li className="media">
				<div className="media-left">
					<img className="media-object img-rounded" src={this.props.user.profilepic}></img>
				</div>
				<div className="media-body">
					<h4 className="media-heading">{this.props.user.username}</h4>
					{this.props.content}
				</div>
				<div className="media-right">
					<p>{this.props.time_stamp}</p>
				</div>
			</li>
			);
	}
}