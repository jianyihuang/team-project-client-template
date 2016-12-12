import React from 'react';
import Feed from './feed';

export default class DetailPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: this.props.current_user
    }
  }
  componentWillReceiveProps(newProps) {
    console.log('DetailPage receives new user id: ' + newProps.current_user);
    this.setState({
      current_user: newProps.current_user
    });
  }
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
            <Feed current_user={this.state.current_user} type={this.props.type}
              isRequestPage = {this.props.isRequestPage}/>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    );
  }
}
