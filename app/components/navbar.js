import React from 'react';
import {Link} from 'react-router';
export default class Navbar extends React.Component {
	render() {
		return(
			<nav className="navbar navbar-fixed-top navbar-default">
				<a className="navbar-brand" href="#"> ExServ</a>
					<div className="container">
						<div className="nav navbar-nav navbar-left">
							<ul className="nav nav-pills">
								<li>
									<a href="#"><span className="glyphicon glyphicon-book"></span>
										Academic
									</a>
								</li>
								<li>
									<a href="#"><span className="glyphicon glyphicon-tags"></span>
										Service
									</a>
								</li>
							</ul>
						</div>
					<div className="nav navbar-nav navbar-right">
						<form className="navbar-form navbar-left" role="search">
							<div className="input-group">
								<input type="text" className="form-control exSer-search" placeholder="Search for service" />
								<span className="input-group-btn">
									<button type="submit" className="btn btn-default">
										<span className="glyphicon glyphicon-search"></span>
									</button>
								</span>
							</div>
						</form>
						<div className="nav navbar-nav">
							<div className="btn-group" role="group">
								<button type="button" className="btn navbar-btn btn-default">
									<span className="glyphicon glyphicon-envelope"></span>
										<Link to="/message"> Messages</Link>
									<span className="badge">2</span>
								</button>
								<button type="button" className="btn navbar-btn btn-default">
										<span className="glyphicon glyphicon-edit"></span>
										Write a Request
								</button>
								<button type="button" className="btn navbar-btn btn-default dropdown-toggle "
											data-toggle="dropdown">
											User
								<span className="caret"></span>
								</button>
								<ul className="dropdown-menu">
									<li><a href="#"><span className="glyphicon glyphicon-user"></span>
											Profile</a>
									</li>
									<li><a href="#"><span className="glyphicon glyphicon-pencil"></span>
											My Request</a>
									</li>
									<li><a href="#"><span className="glyphicon glyphicon-calendar"></span>
											My schedule</a>
									</li>
									<li><a href="#"><span className="glyphicon glyphicon-cog"></span>
											Settings</a>
									</li>
									<li><a href="#"><span className="glyphicon glyphicon-off"></span>
											Log off</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}
