import React from 'react';
import {getMessageBoxServer, getParticipantProfiles} from '../../server.js';

export class MessageBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			participant_profiles: []
		};
		this.clicked = this.clicked.bind(this);
	}
	componentDidMount(){
        getParticipantProfiles(this.props.boxId, (profiles) => {
            // console.log(JSON.stringify(profiles));
            this.setState({
                participant_profiles: profiles
            });
        });
	}
	componentWillReceiveProps(newProps) {
		// console.log("New props:" + JSON.stringify(newProps));
		// getParticipantProfiles(newProps.boxId, (profiles) => {
  //           // console.log(JSON.stringify(profiles));
  //           this.setState({
  //               participant_profiles: profiles
  //           });
  //       });
	}
	clicked() {
		this.props.onRecentBoxMsgClicked(this.props.boxId);
	}
	render() {
		return (
				<li className="list-group-item recent-conv" onClick={this.clicked}>
					<small>Message Box ID {this.props.boxId} <br/> {this.state.participant_profiles.map((profile, i) => {
                                                                return <img src={profile.profilepic} key={i}  className="img-circle" width="25px" height="25px"/>
                                                            })}</small>
					<br/>
				</li>
			);
	}
}