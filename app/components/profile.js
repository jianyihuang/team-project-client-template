import React from 'react';

export default class Profile extends React.Component{
  render() {
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
                      <img src="img/student.jpg" alt="profile-pic" className="img-thumbnail img-responsive profile-pic-size"/>
                      <span className="glyphicon glyphicon-camera"></span>
                      </div>
                    </div>
                  </div>
                <div className="col-md-3">
                </div>
              </div>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-md-3 control-label">Nickname</label>
                  <div className="col-md-7">
                    <input className="form-control" id="nameInput" type="text" placeholder="What would you like to be called?"/>
                  </div>
                </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Level</label>
                <div className="col-md-5">
                  <input className="form-control" id="yearInput" type="text" placeholder="What level are you?"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Institution</label>
                <div className="col-md-7">
                  <input className="form-control" id="schoolInput" type="text" placeholder="What school do you go to?"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Favorite Quote</label>
                <div className="col-md-7">
                  <input className="form-control expandable" id="quoteInput" type="text" placeholder="What's your favorite quote?"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Interested Subjects</label>
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
              <div className="col-md-12 text-center">
                <button type="button" className="btn btn-primary">
                  Save
                <span className="glyphicon glyphicon-ok"></span>
                </button>
                <button type="button" className="btn btn-primary">
                  Cancel
                <span className="glyphicon glyphicon-remove"></span>
                </button>
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
