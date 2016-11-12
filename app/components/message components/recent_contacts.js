import React from 'react';

export default class RecentContacts extends React.Component {
	render() {
		return (
			<div class="col-xs-2">
				<div class="row">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4><span class="glyphicon glyphicon-book"></span> Recent contacts</h4>
						</div>
						<div class="panel-body">
							<ul class="media-list recent-contact">
							{/*List of Recent Contacts*/}															
							</ul>
						</div>
					</div>
				</div>
			</div>
			);
	}
}