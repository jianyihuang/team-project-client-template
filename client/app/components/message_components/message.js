import React from 'react';
import {unixTimeToString} from '../../util';

export class Message extends React.Component {
	render() {
		return (
			<li className="media">
				<div className="media-left">
					<img className="media-object img-rounded" src={this.props.profile.profilepic}></img>
				</div>
				<div className="media-body">
					<h4 className="media-heading">{this.props.profile.username}</h4>
						<p>{this.props.content}</p>
				</div>
				<div className="media-right">
					<p>{unixTimeToString(this.props.timestamp)}</p>
					
				</div>
			</li>
			);
	}
}