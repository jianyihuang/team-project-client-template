import React from 'react';
import {MessageBox} from './message_components/message_box';
import {Message} from './message_components/message';
import {MessageEditor} from './message_components/message_editor';
import {sendMessageServer, getMessageBoxServer, getRecentMessageBoxes, getParticipantProfiles, createMessageBox, joinMessageBox} from '../server';
import {resetDatabase} from '../server';
// import server functions here.

const initial_user = 1;
const n_recent_msgbox = 10;

export default class MessagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user_id: initial_user, messages: [], recent_msgBoxes: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.refreshMessageBox = this.refreshMessageBox.bind(this);
        this.refresh = this.refresh.bind(this);
        this.createNewConversation = this.createNewConversation.bind(this);
        this.addNewParticipant = this.addNewParticipant.bind(this);
        this._userChanged= this._userChanged.bind(this);
        this.loadMessageBox = this.loadMessageBox.bind(this);
    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        // Get recent message boxes.
        getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
            // Get the most recent message box.
            this.loadMessageBox(recent_msg_boxes[0]);
            this.setState({
                recent_msgBoxes: recent_msg_boxes
            })
        });
    }
    sendMessage(entered_text) {
        // Send the message to the server.
        sendMessageServer(this.state.msg_box_id, this.state.user_id, entered_text, (updatedMsgBox) => {
            console.log(JSON.stringify(updatedMsgBox));
            // Refresh the message box.
            this.setState({
                messages: updatedMsgBox.list_of_messages_by_users_in_box
            });
        });
    }
    createNewConversation() {
        createMessageBox(this.state.user_id, (msg_box) => {
            this.refreshMessageBox(msg_box);
            getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
                this.setState({
                    recent_msgBoxes: recent_msg_boxes
                });
                console.log('New message box: ' + JSON.stringify(this.state));
            });
        });
    }
    loadMessageBox(msg_box_id) {
        getMessageBoxServer(msg_box_id, (msg_box) => {
                getParticipantProfiles(msg_box._id, (profiles) => {
                    this.setState({
                        msg_box_id: msg_box._id,
                        messages: msg_box.list_of_messages_by_users_in_box,
                        participant_profiles: profiles
                    });
                });
            });
    }
    refreshMessageBox(updatedMsgBox) {
                getParticipantProfiles(updatedMsgBox._id, (profiles) => {
                    this.setState({
                        msg_box_id: updatedMsgBox._id,
                        messages: updatedMsgBox.list_of_messages_by_users_in_box,
                        participant_profiles: profiles
                    });
                });
    }
    addNewParticipant(){
        var invitedUserId = Number(this.refs.invitedUser.value);
        joinMessageBox(this.state.msg_box_id, invitedUserId, (updatedMsgBox) => {
            this.refreshMessageBox(updatedMsgBox);
        });
    }
    _userChanged(event) {
        this.setState({
            textChangeUser: event.target.value,
            user_id: Number(event.target.value)
        });
    }
    changeUser(){
          this.refresh();
    }
  render() {
    return(
      <div className="container content">
    		<div className="row">
    			<div className="col-xs-4">
    				<div className="row">
    					<div className="panel panel-default">
    						<div className="panel-heading">
    							<h4><span className="glyphicon glyphicon-book"></span> Recent Conversations</h4>
    						</div>
    						<div className="panel-body">
    							<ul className="list-group recent-contact">
                                                                            {
                                                                                this.state.recent_msgBoxes.map((boxId, i) => {
                                                                                    return <MessageBox key={i} boxId={boxId} onRecentBoxMsgClicked={this.loadMessageBox}/>;
                                                                                })
                                                                            }
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>

    			<div className="col-xs-8">
    				<div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h4><span className="glyphicon glyphicon-book"></span>{this.state.msg_box_id}</h4>
                                                        <div className="btn-group footer-btn">
                                                            <button className="btn btn-default" onClick={this.createNewConversation}><span className="glyphicon glyphicon-calendar"></span>New Conversation</button>

                                                            <button className="btn btn-default" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-calendar"></span>Add Participant</button>
                                                            <div id="myModal" className="modal fade" role="dialog">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                                            <h4 className="modal-title">Search and Select Participants</h4>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            User ID :: <input ref="invitedUser" type="text"/>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.addNewParticipant}>Add</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
    					<div className="panel-body custom-scrollable">
    						<ul className="media-list chat-box">
                                                                        {
                                                                            this.state.messages.map((message, i) => {
                                                                                var profile = this.state.participant_profiles.filter(function(profile) {
                                                                                    return profile.user_id === message.user_id;
                                                                                });
                                                                                if (profile.length !== 0) {
                                                                                    profile = profile[0];
                                                                                    return (
                                                                                        <Message key={i} profile={profile} {...message}/>
                                                                                        );
                                                                                }
                                                                                else {
                                                                                    console.log('Empty Participants!');
                                                                                }
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
                                        <p><button type='button' onClick={resetDatabase}> Reset Database</button></p>
                                        <p>UserID: <input type='text' size='3' maxLength='1' defaultValue={initial_user} value={this.state.textChangeUser} onChange={this._userChanged}/></p>
                                        <p><button type='button' onClick={this.changeUser}>Change User</button></p>
    			</div>
    		</div>
    	</div>
    );
  }
}
