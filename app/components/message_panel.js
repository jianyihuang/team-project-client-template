import React from 'react';
// import RecentContact from './message-components/recent_contacts';
// import MessageBox from './message-components/message_box';
import {Contact} from './message_components/contact';
import {Message} from './message_components/message';

export default class MessagePanel extends React.Component {
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
                                                                                <Contact imgUrl={'img/pug.jpg'} userName={'Jianyi'}/>
                                                                                <Contact imgUrl={'img/pug.jpg'} userName={'Xin'}/>
                                                                                <Contact imgUrl={'img/cat.jpeg'} userName={'Timurphy'}/>
                                                                                <Contact imgUrl={'img/pug.jpg'} userName={'Thien'}/>
                                                                                <Contact imgUrl={'img/cat.jpeg'} userName={'Jucong'}/>
                                                                                <Contact imgUrl={'img/cat.jpeg'} userName={'Karen'}/>
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>

    			<div className="col-xs-8">
    				<div className="panel panel-default">
    					<div className="panel-body">
    						<ul className="media-list chat-box">
                                                                        <Message data={{
                                                                            time_stamp: '2:54pm',
                                                                            content: <p>the current homepage we have wont count as a page. It would make sense that after the user logs in they are directed to the academic or academic subject page but someone is doing those pages already</p>
                                                                        }} user={{
                                                                            username: 'Karen',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:02pm',
                                                                            content: <p>is the academic page the one with the grids. I know but I gotta study for interview,so im trynna get basic in then improve upon it</p>
                                                                        }} user={{
                                                                            username: 'Timurphy',
                                                                            profilePic: 'img/pug.jpg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:24pm',
                                                                            content: <p> how are you guys doing I am considering adding some material design concept in UI</p>
                                                                        }} user={{
                                                                            username: 'Jucong',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:37pm',
                                                                            content: <p>good job, Jucong. You may create a writeup document for the team if you want.</p>
                                                                        }} user={{
                                                                            username: 'Thien',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:38pm',
                                                                            content:<p>I only have time after 5 tmr</p>
                                                                        }} user={{
                                                                            username: 'Jucong',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:39pm',
                                                                            content: <p>ok ok ok guys, it's fine. We'll figure this out.</p>
                                                                        }} user={{
                                                                            username: 'Thien',
                                                                            profilePic: 'img/pug.jpg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:41pm',
                                                                            content: <p>If possible, can you guys all implement the floating effect ? It's very straight forward</p>
                                                                        }} user={{
                                                                            username: 'Jucong',
                                                                            profilePic: 'img/pug.jpg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '3:56pm',
                                                                            content: <p> I changed the config if you are satisfied with that I will add the css</p>
                                                                        }} user={{
                                                                            username: 'JianYi',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
                                                                        <Message data={{
                                                                            time_stamp: '4:03pm',
                                                                            content: <p>I thought someone else is doing that one. I can do that too.</p>
                                                                        }} user={{
                                                                            username: 'Xin',
                                                                            profilePic: 'img/cat.jpeg'
                                                                        }}/>
    						</ul>
    					</div>
    					<div className="panel-footer">
    						<textarea placeholder="Enter text to reply"></textarea>
    						<div>
    							<div className="btn-toolbar">
    								<div className="input-group">
    									<button className="form-control btn btn-primary">
    										<span className="glyphicon glyphicon-pencil"></span>
    										Send
    									</button>
    									<span className="input-group-addon">
    										<input type="checkbox" name="enter_send" />
    										Press Enter to send.
    									</span>
    									<div className="btn-group pull-right footer-btn">
    										<button className="btn btn-default"><span className="glyphicon glyphicon-file"></span>Add File</button>
    										<button className="btn btn-default"><span className="glyphicon glyphicon-calendar"></span>Add Appointment</button>
    									</div>
    								</div>

    							</div>
    						</div>
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
