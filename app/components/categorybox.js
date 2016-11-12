import React from 'react';
import {Link} from 'react-router';
export default class CategoryBox extends React.Component {
  render() {
    return(
      <div className = "container">
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Computer Science</h5>
                  <Link to="/acedemicdetail"><img src="img/cmpSci.jpeg"/></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Math</h5>
                <Link to="/acedemicdetail"><img src="img/math.jpg"/></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Physics</h5>
                <Link to="/acedemicdetail"><img src="img/physics.jpeg"/></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Music</h5>
                <Link to="/acedemicdetail"><img src="img/music.jpg"/></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">Histroy</h5>
                <Link to="/acedemicdetail"><img src="img/history.jpg"/></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 className="text-center">English</h5>
                <Link to="/acedemicdetail"><img src="img/english.jpg"/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
