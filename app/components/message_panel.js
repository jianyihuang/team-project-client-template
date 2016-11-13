import React from 'react';
import {Contact} from './message_components/contact';
import {Message} from './message_components/message';
import {MessageEditor} from './message_components/message_editor';
// import server functions here.

export default class MessagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: 3,
            data: {
                contacts: [
                    {username: 'Jianyi', profilepic: 'img/pug.jpg'},
                    {username: 'Xin', profilepic: 'img/pug.jpg'},
                    {username: 'Timurphy', profilepic: 'img/cat.jpeg'},
                    {username: 'Thien', profilepic: 'img/pug.jpg'},
                    {username: 'Jucong', profilepic: 'img/cat.jpeg'},
                    {username: 'Karen', profilepic: 'img/cat.jpeg'},
                ],
                messages: [
                    {user_id: 5, time_stamp: '2:54pm', content: <p>the current homepage we have wont count as a page. It would make sense that after the user logs in they are directed to the academic or academic subject page but someone is doing those pages already</p>},
                    {user_id: 2, time_stamp: '3:02pm', content: <p>is the academic page the one with the grids. I know but I gotta study for interview,so im trynna get basic in then improve upon it</p>},
                    {user_id: 4, time_stamp: '3:24pm', content: <p> how are you guys doing I am considering adding some material design concept in UI</p>},
                    {user_id: 3, time_stamp: '3:37pm', content: <p>good job, Jucong. You may create a writeup document for the team if you want.</p>},
                    {user_id: 4, time_stamp: '3:38pm', content: <p>I only have time after 5 tmr</p>},
                    {user_id: 3, time_stamp: '3:39pm', content: <p>ok ok ok guys, it's fine. We'll figure this out.</p>},
                    {user_id: 4, time_stamp: '3:41pm', content: <p>If possible, can you guys all implement the floating effect ? It's very straight forward</p>},
                    {user_id: 0, time_stamp: '3:56pm', content: <p> I changed the config if you are satisfied with that I will add the css</p>},
                    {user_id: 1, time_stamp: '4:03pm', content: <p>I thought someone else is doing that one. I can do that too.</p>},
                ]
            }
        };
        this.sendMessage = this.sendMessage.bind(this);
    }
    sendMessage(entered_text) {
        // Add into data.
        var updated_data = this.state.data;
        updated_data.messages.push({user_id: this.state.current_user, time_stamp: '5:55pm', content:<p>{entered_text}</p>});
        this.setState({data: updated_data});
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
                                                                                    this.state.data.contacts.map(function(aContact, i) {
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
                                                                            this.state.data.messages.map((message, i) => {
                                                                                var user = this.state.data.contacts[message.user_id];
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
    				<p>Future</p>
    			</div>
    		</div>
    	</div>
    );
  }
}
