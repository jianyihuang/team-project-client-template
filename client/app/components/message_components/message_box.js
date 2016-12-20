import React from 'react';
import {getMessageBoxServer, getParticipantProfiles, changeToken} from '../../server.js';

export class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxId: props.boxId,
            participant_profiles: props.profiles
        };
        this.clicked = this.clicked.bind(this);
        // console.log('MessageBox created.');
        // console.log(props);
    }
    componentDidMount() {
        // getParticipantProfiles(this.props.boxId, (profiles) => {
        //     // console.log(JSON.stringify(profiles));
        //     this.setState({
        //         participant_profiles: profiles
        //     });
        //     console.log('MessageBox mounted');
        // });
    }
    componentWillReceiveProps(newProps) {
        // console.log("New props:" + JSON.stringify(newProps));
        // getParticipantProfiles(newProps.boxId, (profiles) => {
        //           // console.log(JSON.stringify(profiles));
        this.setState({boxId: newProps.boxId, participant_profiles: newProps.profiles});
        //       });
    }
    clicked() {
        this.props.onRecentBoxMsgClicked(this.state.boxId);
    }
    render() {
        return (
            <li className="list-group-item recent-conv" onClick={this.clicked}>
                <small>Message Box ID {this.props.boxId}
                    <br/> {this.state.participant_profiles.map((profile, i) => {
                        return <img src={profile.profilepic} key={i} className="img-circle" width="25px" height="25px"/>
                    })}</small>
                <br/>
            </li>
        );
    }
}
