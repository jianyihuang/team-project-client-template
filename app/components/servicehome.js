import React from 'react';

export default class ServiceHome extends React.Component{

render(){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Pet related</h5>
							<a href="#"><img src="img/cat.jpeg"/></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Home improvement</h5>
							<a href="#"><img src="img/home.jpeg"/></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Travel</h5>
              <a href="#"><img src="img/travel.jpeg"/></a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Yard</h5>
              <a href="#"><img src="img/yard.jpg"/></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Plumer</h5>
              <a href="#"><img src="img/toilet_stuck.jpg"/></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h5 className="text-center">Car pool</h5>
              <a href="#"><img src="img/carpool.png"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
}
