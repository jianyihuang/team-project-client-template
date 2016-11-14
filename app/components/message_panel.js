import React from 'react';
import {Contact} from './message_components/contact';
import {Message} from './message_components/message';
import {MessageEditor} from './message_components/message_editor';
import {sendMessageServer, getMessageBoxServer, getParticipantProfiles} from '../server';
import {resetDatabase} from '../database';
// import server functions here.

const msg_box_id = 1;

export default class MessagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current_user: 1, messages: [], participant_profiles: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }
    componentDidMount() {        
        getMessageBoxServer(msg_box_id, (msg_box) => {
            getParticipantProfiles(msg_box_id, (profiles) => {
                this.setState({
                    messages: msg_box.list_of_messages_by_users_in_box,
                    participant_profiles: profiles
                });
                // this.state.messages.map(function(m) {
                //     console.log(JSON.stringify(m));
                // })
                // console.log(typeof(this.state.participant_profiles));
                // this.state.participant_profiles.map(function(p) {
                //     console.log(JSON.stringify(p));
                // });
            });
        }); 
                
    }
    sendMessage(entered_text) {
        // Send the message to the server.
        sendMessageServer(msg_box_id, this.state.current_user, entered_text, (newMessageBox) => {
            // Refresh the message box.
            this.setState({
                messages: newMessageBox.list_of_messages_by_users_in_box
            });
        });
    }
    changeUser(event){
        var user = event.target.value;
        this.setState({
            current_user: Number(user)
        });
    }
  render() {
    return(
      <div className="container content">
    		<div className="row">
    			<div className="col-xs-2">
    				<div className="row">
    					<div className="input-group">
    						<input type="text" className="form-control" placeholder="Search for contact" />
    						<span className="input-group-btn">
    							<button type="submit" className="btn btn-default">
    								<span className="glyphicon glyphicon-search"></span>
    							</button>
    						</span>
    					</div>
    				</div>
    				<div className="row">
    					<div className="panel panel-default">
    						<div className="panel-heading">
    							<h4><span className="glyphicon glyphicon-book"></span> Recent contacts</h4>
    						</div>
    						<div className="panel-body">
    							<ul className="media-list recent-contact">
                                                                                {
                                                                                    this.state.participant_profiles.map((profile, i) => {
                                                                                        return <Contact key={i} imgUrl={profile.profilepic} userName={profile.username}/>;
                                                                                    })
                                                                                }
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>

    			<div className="col-xs-8">
    				<div className="panel panel-default">
    					<div className="panel-body">
    						<ul className="media-list chat-box">
                                                                        {
                                                                            this.state.messages.map((message, i) => {
                                                                                var profile = this.state.participant_profiles.filter(function(profile) {
                                                                                    return profile.user_id === message.user_id;
                                                                                })[0];
                                                                                return (
                                                                                    <Message key={i} profile={profile} {...message}/>
                                                                                    );
                                                                            })
                                                                        }
    						</ul>
    					</div>
    					<div className="panel-footer">
                                                            <MessageEditor onMessageSend={this.sendMessage}/>
    					</div>
    				</div>
    			</div>
    			<div className="col-xs-2">
                                        {
                                            this.state.participant_profiles.map(function(profile, i) {
                                                return <p key={i}>{profile.username}-id:{profile.user_id}</p>;
                                            })
                                        }
    				<p>UserID: <input type='text' size='3' maxLength='1' value={this.state.current_user} onChange={this.changeUser}/></p>
                                        <p><button type='button' onClick={resetDatabase}> Reset Database</button></p>
    			</div>
    		</div>
    	</div>
    );
  }
}
