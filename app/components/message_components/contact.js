import React from 'react';

export class Contact extends React.Component {
	render() {
		return (
				<li className="media">
					<div className="media-left">
						<img className="media-object img-rounded" src={this.props.imgUrl}/>
					</div>
					<div className="media-body">
						<h4 className="media-heading">{this.props.userName}</h4>
					</div>
				</li>
			);
	}
}