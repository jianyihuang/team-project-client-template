import React from 'react';
import Feed from './feed';

export default class DetailPage extends React.Component {
  render() {
    return (
      <div className = "container">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12 catergory_status">
                <span className="glyphicon glyphicon-th-list"></span>
                Newest Requests
              </div>
            </div>
            <Feed user={1} type={this.props.type}/>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    );
  }
}
