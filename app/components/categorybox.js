import React from 'react';

export default class CategoryBox extends React.Component {
  render() {
    return(
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Computer Science</h5>
                  <a href="#"><img src="img/cmpSci.jpeg"/></a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Math</h5>
                <a href="#"><img src="img/math.jpg"/></a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Physics</h5>
                <a href="#"><img src="img/physics.jpeg"/></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Music</h5>
                <a href="#"><img src="img/music.jpg"/></a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Histroy</h5>
                <a href="#"><img src="img/history.jpg"/></a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">English</h5>
                <a href="#"><img src="img/english.jpg"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
