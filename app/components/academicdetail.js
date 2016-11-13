import React from 'react';
import FeedItem from './feeditem';
import Recommendation from './recommendation';

export default class AcademicDetail extends React.Component {
  render() {
    return (
      <div className = "container">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 catergory_status">
                <span className="glyphicon glyphicon-th-list"></span>
                Newest Requests
              </div>
            </div>
            <FeedItem />
            <FeedItem />
            <FeedItem />
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="row">
                    <div className="col-md-12 catergory_status">
                      <span className="glyphicon glyphicon-sunglasses"></span>
                      Recommendation
                    </div>
                  </div>
                </div>
                <div className="list-group">
                  <Recommendation />
                  <Recommendation />
                  <Recommendation />
                  <Recommendation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
