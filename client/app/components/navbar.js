import React from 'react';
import {Link} from 'react-router';
import SearchBar from './searchbar';
import {resetDatabase, getUserData} from '../server';

export default class Navbar extends React.Component {
constructor(props) {
	super(props);
	this.state = {
		text: String(props.current_user),
		user_id: props.current_user,
		user_name: '',
		profile_pic: ''
	}
	this._userChanged = this._userChanged.bind(this);
	this.changeUser = this.changeUser.bind(this);
}
componentDidMount(){
	getUserData(this.state.user_id, (user_profile) => {
		this.setState({
			user_name: user_profile.username,
			profile_pic: user_profile.profilepic,
		});
	});
}
componentWillReceiveProps(newProps){
	getUserData(newProps.current_user, (user_profile) => {
		this.setState({
		  text: newProps.current_user,
		  user_name: user_profile.username
		});
	});
}
_userChanged(event) {
    event.preventDefault();
    this.setState({
    	text: event.target.value,
        user_id: Number(event.target.value)
    });
}
changeUser(){
	this.props.onUserChanged(this.state.user_id);
}
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
										<Link to="/servicehome"><span className="glyphicon glyphicon-tags"></span>
											Service
										</Link>
									</li>
									<li><button type='button' onClick={resetDatabase}> Reset Database</button></li>
                                    <li>UserID: <input type='text' size='3' maxLength='1' value={this.state.text} onChange={this._userChanged}/></li>
                                    <li><button type='button' onClick={this.changeUser}>Change User</button></li>
								</ul>
							</div>
							<div className="nav navbar-nav navbar-right">
								<SearchBar searchTerm={this.props.searchTerm} />
								<div className="nav navbar-nav">
									<div className="btn-group" role="group">
										<Link to="/message" type="button" className="btn navbar-btn btn-default">
											<span className="glyphicon glyphicon-envelope"></span>
											Messages
											<span className="badge">2</span>
										</Link>
										<Link to="/service_detail" className="btn navbar-btn btn-default" >
											<span className="glyphicon glyphicon-edit"></span>
											Write a Request
										</Link>
										<button type="button" className="btn navbar-btn btn-default dropdown-toggle "
											data-toggle="dropdown">
											{this.state.user_name} <img src={this.state.profile_pic} width='15px' height='15px'/>
											<span className="caret"></span>
										</button>
										<ul className="dropdown-menu">
											<li><Link to="/profile"><span className="glyphicon glyphicon-user"></span>
											Profile</Link>
											</li>
											<li><a href="#"><span className="glyphicon glyphicon-pencil"></span>
											My Request</a>
											</li>
											<li><Link to="/schedule"><span className="glyphicon glyphicon-calendar"></span>
											My schedule</Link>
											</li>
											<li><Link to="/config"><span className="glyphicon glyphicon-cog"></span>
											Settings</Link>
											</li>
											<li><Link to= "/login"><span className="glyphicon glyphicon-off"></span>
											Log off</Link>
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
