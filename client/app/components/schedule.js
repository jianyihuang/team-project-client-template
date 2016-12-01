import React from 'react';
import {Schedulebox} from './schedulebox';
import {getScheduleData} from '../server';
import {resetDatabase} from '../database';

const initial_user = 1;
export default class Schedule extends React.Component {
  constructor(props) {
      super(props);
      this.state = {current_user:initial_user, schedules: []};
  }

    refresh() {
      getScheduleData(this.state.current_user, (scheduleData) => {
              this.setState({
                schedules: scheduleData
              });
          });
  }

  componentDidMount() {
      this.refresh()
    }


  render(){
    return(
      <div>
      <div className="container content">
        { this.state.schedules.map((scheduleItem,i) => {
         return(
           <Schedulebox key = {i} firstName={scheduleItem._id.first_name} postDate={scheduleItem.contents.date}
             serviceContent={scheduleItem.contents.serviceContents} startTime={scheduleItem.contents.timestamp_start}
            endTime={scheduleItem.contents.timestamp_end} party={scheduleItem.contents.party}
            completed={scheduleItem.completed} id ={scheduleItem.index}   />
        );
      })
    }
        </div>

        <div className="col-xs-3">
          <p><button type='button' onClick={resetDatabase}> Reset Database</button></p>
        </div>

        <div className="col-xs-3"/>
        <div className="col-xs-6">
          <div className="panel panel-default">
            <div className= "panel-color">
              <div className="panel-body">
                <font size="5">Add an appointment </font>
                <div className="row">
                  <div className= "col-xs-3">
                    <strong>Your Name</strong>
                  </div>
                  <div className= "col-xs-5">
                    <div className="input-style">
                      <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange}/>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className= "col-xs-3">
                    <strong>Date(e.g. 10/6/2016)</strong>
                  </div>
                  <div className= "col-xs-5">
                    <div className="input-style">
                      <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className= "col-xs-3">
                    <strong>Service(e.g. CS121)</strong>
                  </div>
                  <div className= "col-xs-5">
                    <div className="input-style">
                      <input type="text" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                  </div>
                </div>
                <hr />
              <div className="row">
                    <div className= "col-xs-3">
                      <strong>Time(e.g. 9AM-12AM)</strong>
                    </div>
                    <div className= "col-xs-5">
                      <div className="input-style">
                        <input type="text" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
              <div className= "col-xs-3">
              <strong>Subscriber</strong>
                </div>
              <div className= "col-xs-5">
            <div className="input-style">
                <input type="text" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
              </div>
            </div>
          <hr />
                <div className="text-center">
                  <div className="btn-group" role="group">
                    <button className="button-style" onClick={this.handleSave} >
                      <span className="glyphicon glyphicon-check"></span>
                      Add to Schedule
                    </button>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
