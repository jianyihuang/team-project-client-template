import React from 'react';
export default class Message extends React.Component {
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
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/pug.jpg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">JianYi</h4>
    									</div>
    								</li>
    								<hr/>
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/pug.jpg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">Xin</h4>
    									</div>
    								</li>
    								<hr/>
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/cat.jpeg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">Timurphy</h4>
    									</div>
    								</li>
    								<hr/>
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/pug.jpg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">Thien</h4>
    									</div>
    								</li>
    								<hr/>
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/cat.jpeg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">Jucong</h4>
    									</div>
    								</li>
    								<hr/>
    								<li className="media">
    									<div className="media-left">
    										<img className="media-object img-rounded" src="img/cat.jpeg" />
    									</div>
    									<div className="media-body">
    										<h4 className="media-heading">Karen</h4>
    									</div>
    								</li>
    								<hr/>
    							</ul>
    						</div>
    					</div>
    				</div>
    			</div>

    			<div className="col-xs-8">
    				<div className="panel panel-default">
    					<div className="panel-body">
    						<ul className="media-list chat-box">
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Karen</h4>
    									<p>the current homepage we have wont count as a page. It would make sense that after the user logs in they are directed to the academic or academic subject page but someone is doing those pages already</p>
    								</div>
    								<div className="media-right">
    									<p>2:54pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/pug.jpg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Timurphy</h4>
    									<p>is the academic page the one with the grids. I know but I gotta study for interview,so im trynna get basic in then improve upon it</p>
    								</div>
    								<div className="media-right">
    									<p>3:02pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Jucong</h4>
    									<p>
    										how are you guys doing
    										I am considering adding some material design concept in UI
    									</p>
    								</div>
    								<div className="media-right">
    									<p>3:24pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Thien</h4>
    									<p>good job, Jucong. You may create a writeup document for the team if you want.</p>
    								</div>
    								<div className="media-right">
    									<p>3:37pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Jucong</h4>
    									<p>
    										I only have time after 5 tmr
    									</p>
    								</div>
    								<div className="media-right">
    									<p>3:38pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/pug.jpg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Thien</h4>
    									<p>ok, it's fine. We'll figure this out.</p>
    								</div>
    								<div className="media-right">
    									<p>3:39pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/pug.jpg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Jucong</h4>
    									<p>
    										If possible, can you guys all implement the floating effect ?
    										It's very straight forward
    									</p>
    								</div>
    								<div className="media-right">
    									<p>3:41pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">JianYi</h4>
    									<p>
    										I changed the config
    										if you are satisfied with that I will add the css
    									</p>
    								</div>
    								<div className="media-right">
    									<p>3:56pm</p>
    								</div>
    							</li>
    							<li className="media">
    								<div className="media-left">
    									<img className="media-object img-rounded" src="img/cat.jpeg"></img>
    								</div>
    								<div className="media-body">
    									<h4 className="media-heading">Xin</h4>
    									<p>
    										I thought someone else is doing that one.
    										I can do that too.
    									</p>
    								</div>
    								<div className="media-right">
    									<p>4:03pm</p>
    								</div>
    							</li>
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
