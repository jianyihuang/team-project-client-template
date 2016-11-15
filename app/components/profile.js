import React from 'react';
import {getUserData, saveUserData} from '../server';

export default class Profile extends React.Component{
      constructor(props){
        super(props);
          this.state = {
            user: 1
           }
      }



  handleSchool(event) {
    event.preventDefault();
    this.setState({
      school: event.target.value
    });
  }

  handleYear(event) {
    event.preventDefault();
    this.setState({
      education_level: event.target.value
    });
  }

  handleQuote(event) {
    event.preventDefault();
    this.setState({
      favorite_quote: event.target.value
    });
  }


  handleSaveUserInfo(event) {
    if(event.key === "Enter"){

    saveUserData(1, this.state.school, this.state.education_level, this.state.favorite_quote, (user) => {
      this.setState({user:user});
    });

    }
  }

  handleKeyUp(event) {
    if(event.key === "Enter"){
      var school =document.getElementById('schoolInput').value.trim();
      var year = document.getElementById('yearInput').value.trim();
      var quote = document.getElementById('quoteInput').value.trim();
      saveUserData(1, school, year, quote, (user) => {
        this.setState(
          user: user
        );
      });
    }
  }


  render() {
    var user = getUserData(1);
    return (
      <div className = "container">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-3">
                  </div>
                  <div className="col-md-6">
                    <div className="additionalPadding">
                      <div className="profile-pic">
                      <img src={this.state.profilepic} alt="profile-pic" className="img-thumbnail img-responsive profile-pic-size"/>
                      <span className="glyphicon glyphicon-camera"></span>
                      </div>
                    </div>
                  </div>
                <div className="col-md-3">
                </div>
              </div>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-md-3 control-label"> First Name</label>
                  <div className="col-md-7">
                    {this.state.first_name}
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label"> Last Name</label>
                    <div className="col-md-7">
                      {this.state.last_name}
                    </div>
                  </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Level</label>
                <div className="col-md-5">
                  <input className="form-control expandable" id="yearInput" type="text" placeholder="What level are you?"
                    value={this.state.education_level} onChange={this.handleYear} onKeyUp={this.handleKeyUp}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Institution</label>
                <div className="col-md-7">
                  <input className="form-control expandable" id="schoolInput" type="text" placeholder="What school do you go to?"
                    value={this.state.school} onChange={this.handleSchool} onKeyUp={this.handleKeyUp}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Favorite Quote</label>
                <div className="col-md-7">
                  <input className="form-control expandable" id="quoteInput" type="text" placeholder="What's your favorite quote?"
                    value = {this.state.favorite_quote} onChange={this.handleQuote} onKeyUp={this.handleKeyUp}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Areas of Intersest</label>
                <div className="col-md-7">

                </div>
                <div className="col-md-7">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <form className="form-inline">
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Math
                        </label>
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Music
                        </label>
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Biology
                        </label>
                      </form>
                    </div>


                    <div className="form-group">
                      <button type="button" className="btn btn-default btn-sm">More
                        <span className="glyphicon glyphicon-option-horizontal"></span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    	<div className="col-md-3">
      </div>
    </div>
  </div>


    );
  }



}
