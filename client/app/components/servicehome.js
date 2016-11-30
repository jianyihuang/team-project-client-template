import React from 'react';
import {Link} from 'react-router';
export default class ServiceHome extends React.Component{

render(){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Pet related</h5>
							<Link to="/servicedetail"><img src="img/cat.jpeg"/></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Home improvement</h5>
							<Link to="/servicedetail"><img src="img/home.jpeg"/></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Travel</h5>
              <Link to="/servicedetail"><img src="img/travel.jpeg"/></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Yard</h5>
              <Link to="/servicedetail"><img src="img/yard.jpg"/></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Plumer</h5>
              <Link to="/servicedetail"><img src="img/toilet_stuck.jpg"/></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Car pool</h5>
              <Link to="/servicedetail"><img src="img/carpool.png"/></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
}
