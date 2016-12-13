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
        this.state = {user_id: this.props.current_user, messages: [], recent_msgBoxes: [], participant_profiles: [], msgboxRecentArray: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.refreshMessageBox = this.refreshMessageBox.bind(this);
        this.refresh = this.refresh.bind(this);
        this.createNewConversation = this.createNewConversation.bind(this);
        this.addNewParticipant = this.addNewParticipant.bind(this);
        this.loadMessageBox = this.loadMessageBox.bind(this);
        this.getAllBoxesProfiles = this.getAllBoxesProfiles.bind(this);
    }
    componentDidMount() {
        // Get recent message boxes.
        getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
            // Get the most recent message box.
            getMessageBoxServer(recent_msg_boxes[0], (msg_box) => {
                getParticipantProfiles(msg_box._id, (profiles) => {
                    // console.log(JSON.stringify(profiles));
                    this.setState({
                        msg_box_id: msg_box._id,
                        messages: msg_box.list_of_messages_by_users_in_box,
                        participant_profiles: profiles,
                        recent_msgBoxes: recent_msg_boxes
                    });                    
                    this.getAllBoxesProfiles(this.state.recent_msgBoxes, [], (allProfiles)=>{
                    	this.setState({msgboxRecentArray: allProfiles});
                    });
                });
            });
        });
        // this.timer = setInterval(() => this.loadMessageBox(this.state.msg_box_id), 200);
    }
    componentWillUnmount(){
        // clearInterval(this.timer);
    }
    refresh(user_id) {
        // Get recent message boxes.
        getRecentMessageBoxes(user_id, n_recent_msgbox, (recent_msg_boxes) => {
            // Get the most recent message box.
            getMessageBoxServer(recent_msg_boxes[0], (msg_box) => {
                getParticipantProfiles(msg_box._id, (profiles) => {
                    // console.log(JSON.stringify(profiles));
                    this.setState({
                        msg_box_id: msg_box._id,
                        messages: msg_box.list_of_messages_by_users_in_box,
                        participant_profiles: profiles,
                        recent_msgBoxes: recent_msg_boxes
                    });
                });
            });
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
    // getAllBoxesProfiles(this.state.recent_msgBoxes, [], (boxes_profiles) => {
    //     boxes_profiles.forEach((box_profiles) => {
    //         console.log(JSON.stringify(box_profiles));
    //     });
    // })
    createNewConversation() {
    	// console.log('createNewConversation');
    	// console.log("this.state.user_id=" + this.state.user_id);
        createMessageBox(this.state.user_id, (updatedMsgBox) => {
        	// console.log(JSON.stringify(updatedMsgBox));
        	getParticipantProfiles(updatedMsgBox._id, (profiles) => {
        		// console.log(JSON.stringify(profiles));
        		// console.log(this.state);
                getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
                    this.setState({
		                msg_box_id: updatedMsgBox._id,
		                messages: updatedMsgBox.list_of_messages_by_users_in_box,
		                participant_profiles: profiles,
                        recent_msgBoxes: recent_msg_boxes
                    });                    
                    this.getAllBoxesProfiles(this.state.recent_msgBoxes, [], (allProfiles)=>{
                    	this.setState({msgboxRecentArray: allProfiles});
                    });
        			// console.log(this.state);
           //          console.log('---------------');
                });
	        });
        });
    }
    loadMessageBox(box_id) {
        getMessageBoxServer(box_id, (msg_box) => {
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
        });
    }
    addNewParticipant(){
        // console.log('Participant added!');
        var invitedUserId = toLength24String(Number(this.refs.invitedUser.value));
        // console.log('this.state.msg_box_id=' + this.state.msg_box_id);
        // console.log('invitedUser='+invitedUserId);
        joinMessageBox(this.state.msg_box_id, invitedUserId, (updatedMsgBox) => {
        	// console.log(JSON.stringify(updatedMsgBox));
            getParticipantProfiles(updatedMsgBox._id, (profiles) => {
            	// console.log(JSON.stringify(profiles));
            	// console.log(this.state.user_id);
                getRecentMessageBoxes(this.state.user_id, n_recent_msgbox, (recent_msg_boxes) => {
                    // console.log(JSON.stringify(this.state.recent_msgBoxes));
                    // console.log(JSON.stringify(recent_msg_boxes));
                    this.setState({
                        recent_msgBoxes: recent_msg_boxes,
                        msg_box_id: updatedMsgBox._id,
                        messages: updatedMsgBox.list_of_messages_by_users_in_box,
                        participant_profiles: profiles
                    });                   
                    this.getAllBoxesProfiles(this.state.recent_msgBoxes, [], (allProfiles)=>{
                    	this.setState({msgboxRecentArray: allProfiles});
                    });                    // console.log(JSON.stringify(this.state));
                    // console.log('---------------');
                });
            });
        });
    }
    componentWillReceiveProps(newProps){
    	//this.setState = null;
        console.log('MessagePanel receives new user id:' + newProps.current_user);
        // Get recent message boxes.
        getRecentMessageBoxes(newProps.current_user, n_recent_msgbox, (recent_msg_boxes) => {
            // Get the most recent message box.
            getMessageBoxServer(recent_msg_boxes[0], (msg_box) => {
                getParticipantProfiles(msg_box._id, (profiles) => {
                    // console.log(JSON.stringify(profiles));
                    this.setState({
                        msg_box_id: msg_box._id,
                        messages: msg_box.list_of_messages_by_users_in_box,
                        participant_profiles: profiles,
                        recent_msgBoxes: recent_msg_boxes,
            			user_id: newProps.current_user
                    });                   
                    this.getAllBoxesProfiles(this.state.recent_msgBoxes, [], (allProfiles)=>{
                    	this.setState({msgboxRecentArray: allProfiles});
                    });
                });
            });
        });
    }  
    getAllBoxesProfiles(listMsgBoxes, boxes_profiles, cb) {
        var msg_box_id = listMsgBoxes.pop();
        getParticipantProfiles(msg_box_id, (profiles)=> {
            boxes_profiles.push({box_id: msg_box_id, profiles: profiles});
            if(listMsgBoxes.length === 0) {
                cb(boxes_profiles);
            } else {
                this.getAllBoxesProfiles(listMsgBoxes, boxes_profiles, cb);
            }
        })
    }
  render() {
  	console.log(JSON.stringify(this.state.msgboxRecentArray));
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
                                    	// For each of the recent message boxes,
                                    	this.state.msgboxRecentArray.map((msg_box, i) => {
                                    		return <MessageBox profiles={msg_box.profiles} key={i} boxId={msg_box.box_id} onRecentBoxMsgClicked={this.loadMessageBox}/>;
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
