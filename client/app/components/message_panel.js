import React from 'react';
import {MessageBox} from './message_components/message_box';
import {Message} from './message_components/message';
import {MessageEditor} from './message_components/message_editor';
import {sendMessageServer, getMessageBoxServer, getRecentMessageBoxes, getParticipantProfiles, createMessageBox, joinMessageBox} from '../server';
import {resetDatabase, toLength24String} from '../server';

const n_recent_msgbox = 10;

export default class MessagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user_id: this.props.current_user, messages: [], recent_msgBoxes: [], participant_profiles: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.refreshMessageBox = this.refreshMessageBox.bind(this);
        this.refresh = this.refresh.bind(this);
        this.createNewConversation = this.createNewConversation.bind(this);
        this.addNewParticipant = this.addNewParticipant.bind(this);
        this.loadMessageBox = this.loadMessageBox.bind(this);
    }
    componentDidMount() {
        this.refresh(this.state.user_id);
        // this.timer = setInterval(() => this.loadMessageBox(this.state.msg_box_id), 200);
    }
    componentWillUnmount(){
        // clearInterval(this.timer);
    }
    refresh(user_id) {
        // Get recent message boxes.
        getRecentMessageBoxes(user_id, n_recent_msgbox, (recent_msg_boxes) => {
            // Get the most recent message box.
            this.loadMessageBox(recent_msg_boxes[0]);   
                this.setState({
                    recent_msgBoxes: recent_msg_boxes
                }) ;
        });
    }
    sendMessage(entered_text) {
        // Send the message to the server.
        sendMessageServer(this.state.msg_box_id, this.state.user_id, entered_text, (updatedMsgBox) => {
            // console.log(JSON.stringify(updatedMsgBox));
            // Refresh the message box.
            this.setState({
                messages: updatedMsgBox.list_of_messages_by_users_in_box
            });
        });
    }
    createNewConversation() {
        var zep = this.state.user_id;
        createMessageBox(zep, (msg_box) => {
            this.refreshMessageBox(msg_box, ()=>{
                getRecentMessageBoxes(zep, n_recent_msgbox, (recent_msg_boxes) => {
                    this.setState({
                        recent_msgBoxes: recent_msg_boxes
                    });
                });
            });
        });
    }
    loadMessageBox(msg_box_id) {
        // console.log(JSON.stringify(msg_box_id));
        getMessageBoxServer(msg_box_id, (msg_box) => {
                getParticipantProfiles(msg_box._id, (profiles) => {
                    // console.log(JSON.stringify(profiles));
                    this.setState({
                        msg_box_id: msg_box._id,
                        messages: msg_box.list_of_messages_by_users_in_box,
                        participant_profiles: profiles
                    });
                });
            });
    }
    refreshMessageBox(updatedMsgBox, cb) {
        getParticipantProfiles(updatedMsgBox._id, (profiles) => {
            this.setState({
                msg_box_id: updatedMsgBox._id,
                messages: updatedMsgBox.list_of_messages_by_users_in_box,
                participant_profiles: profiles
            });
            cb();
        });
    }
    addNewParticipant(){
        var invitedUserId = toLength24String(Number(this.refs.invitedUser.value));
        joinMessageBox(this.state.msg_box_id, invitedUserId, (updatedMsgBox) => {
            this.refreshMessageBox(updatedMsgBox, () => {
                getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
                    this.setState({
                        recent_msgBoxes: recent_msg_boxes
                    });
                });
            });
        });
    }
    componentWillReceiveProps(newProps){
        console.log('MessagePanel receives new user id:' + newProps.current_user);
        this.setState({
            user_id: newProps.current_user
        });
        this.refresh(newProps.current_user);
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
    						<div className="panel-body recent-contact recent-scrollable">                        
                                <ul className="list-group">
                                    {
                                        this.state.recent_msgBoxes.map((boxId, i) => {
                                            return <MessageBox key={boxId} boxId={boxId} onRecentBoxMsgClicked={this.loadMessageBox}/>;
                                        })
                                    }
                                </ul>
    						</div>
    					</div>
    				</div>
    			</div>

    			<div className="col-xs-8">
    				<div className="panel panel-default">
                                                    <div className="panel-heading msgbox-heading">
                                                        <h4><span className="glyphicon glyphicon-book"></span>Message Box {this.state.msg_box_id}
                                                            <br/>{this.state.participant_profiles.map((profile, o) => {
                                                                return <img src={profile.profilepic} key={o} className="img-circle" width="25px" height="25px"/>
                                                            })}</h4>
                                                        <div className="btn-group footer-btn">
                                                            <button className="btn btn-default" onClick={this.createNewConversation}><span className="glyphicon glyphicon-calendar"></span>New Conversation</button>

                                                            <button className="btn btn-default" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-calendar"></span>Add Participant</button>
                                                            <div id="myModal" className="modal fade" role="dialog">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                                            <h4 className="modal-title">Enter Participant ID</h4>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            Participant ID <input ref="invitedUser" type="text"/>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.addNewParticipant}>Add</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
    					<div className="panel-body custom-scrollable msgbox-body">
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
    					<div className="panel-footer msgbox-footer">
                                                            <MessageEditor onMessageSend={this.sendMessage}/>
    					</div>
    				</div>
    			</div>
    			<div className="col-xs-2">
    			</div>
    		</div>
    	</div>
    );
  }
}
