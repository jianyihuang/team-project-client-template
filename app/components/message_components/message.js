import React from 'react';

export class Message extends React.Component {
	render() {
		return (
			<li className="media">
				<div className="media-left">
					<img className="media-object img-rounded" src={this.props.user.profilePic}></img>
				</div>
				<div className="media-body">
					<h4 className="media-heading">{this.props.user.username}</h4>
					{this.props.data.content}
				</div>
				<div className="media-right">
					<p>{this.props.data.time_stamp}</p>
				</div>
			</li>
			);
	}
}