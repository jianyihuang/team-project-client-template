import React from 'react';


export default class Config extends React.Component {
	render(){
		return (
			<div className="panel panel-default">
				<div className= "panel-color">
					<div className="panel-body">
						<font size="5">General Account Configuration </font>
						<div className="row">
							<hr />
							<div className= "col-xs-3">
								<strong>Name</strong>
							</div>
							<div className= "col-xs-5">
								<div className="input-style">
									<input type="text" className="form-control" placeholder="John Smith" />
								</div>
							</div>
							<button className="button-style" >
								<span className="glyphicon glyphicon-check"></span>
								Save
							</button>
							<button className="button-style">
								<span className="glyphicon glyphicon-remove"></span>
								Cancel
							</button>
							<hr />
							<div className= "col-xs-3">
								<strong>Username</strong>
							</div>
							<div className= "col-xs-5">
								<div className="input-style">
									<input type="text" className="form-control" placeholder="johnsmith1995" />
								</div>
							</div>
							<button className="button-style">
								<span className="glyphicon glyphicon-check"></span>
								Save
							</button>
							<button className="button-style">
								<span className="glyphicon glyphicon-remove"></span>
								Cancel
							</button>
							<hr />
							<div className= "col-xs-3">
								<strong>Contact</strong>
							</div>
							<div className= "col-xs-5">
								<div className="input-style">
									<input type="text" className="form-control" placeholder="johnsmith@umass.edu" />
								</div>
							</div>
							<button className="button-style">
								<span className="glyphicon glyphicon-check"></span>
								Save
							</button>
							<button className="button-style">
								<span className="glyphicon glyphicon-remove"></span>
								Cancel
							</button>
							<hr />
							<div className= "col-xs-3">
								<strong>Password</strong>
							</div>
							<div className= "col-xs-5">
								<div className="input-style">
									<input type="text" className="form-control" placeholder="**********" />
								</div>
							</div>
							<button className="button-style">
								<span className="glyphicon glyphicon-check"></span>
								Save
							</button>
							<button className="button-style">
								<span className="glyphicon glyphicon-remove"></span>
								Cancel
							</button>
							<hr />
							<div className= "col-xs-3">
								<strong>Classes</strong>
							</div>
							<div className= "col-xs-5">
								CS121, CS187
							</div>
							<button className="button-style">
								<span className="glyphicon glyphicon-plus"></span>
								Add
							</button>
							<button className="button-style">
								<span className="glyphicon glyphicon-remove"></span>
								Remove
							</button>
						</div>
					</div>
				</div>
					<div className="col-xs-3">
					</div>
	</div>
);
}
}
