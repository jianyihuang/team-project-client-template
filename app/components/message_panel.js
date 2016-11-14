import React from 'react';
import {Contact} from './message_components/contact';
import {Message} from './message_components/message';
import {MessageEditor} from './message_components/message_editor';
import {sendMessageServer, getMessageBoxServer} from '../server';
import {resetDatabase} from '../database';
// import server functions here.
const contacts = [
                    {username: 'Jianyi', profilepic: 'img/pug.jpg'},
                    {username: 'Xin', profilepic: 'img/pug.jpg'},
                    {username: 'Timurphy', profilepic: 'img/cat.jpeg'},
                    {username: 'Thien', profilepic: 'img/pug.jpg'},
                    {username: 'Jucong', profilepic: 'img/cat.jpeg'},
                    {username: 'Karen', profilepic: 'img/cat.jpeg'},
                ];
var current_user = 4;
const msg_box_id = 1;

export default class MessagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount() {        
        getMessageBoxServer(msg_box_id, (msg_box) => {
            this.setState({
                messages: msg_box.list_of_messages_by_users_in_box
            });
        });
    }
    sendMessage(entered_text) {
        // Send the message to the server.
        sendMessageServer(msg_box_id, current_user, entered_text, (newMessageBox) => {
            // Refresh the message box.
            this.setState({
                messages: newMessageBox.list_of_messages_by_users_in_box
            });
        });
    }
    changeUser(event){
        var user = event.target.value;
        current_user = Number(user);
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
                                                                                    contacts.map(function(aContact, i) {
                                                                                        return <Contact key={i} imgUrl={aContact.profilepic} userName={aContact.username}/>;
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
                                                                                var user = contacts[message.user_id - 1];
                                                                                return (
                                                                                    <Message key={i} user={user} {...message}/>
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
                                            contacts.map(function(aContact, i) {
                                                return <p key={i}>{aContact.username}-id:{i+1}</p>;
                                            })
                                        }
    				<p>UserID: <input type='text' size='3' maxLength='1' onChange={this.changeUser}/> </p>
                                        <p><button type='button' onClick={resetDatabase}> Reset Database</button></p>
    			</div>
    		</div>
    	</div>
    );
  }
}
