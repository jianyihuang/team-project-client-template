import React from 'react';
import {Schedulebox} from './schedulebox';
import {getScheduleData} from '../server';
import {resetDatabase} from '../database';
import {postSchedule} from '../server';

export default class Schedule extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        user_id: props.current_user,
        schedules: [],
        author: "",
        subscriber : "",
        date : "",
        time: "",
        serviceContents: ""
      };
      this.handleAuthorChange = this.handleAuthorChange.bind(this);
      this.handleSubscriberChange = this.handleSubscriberChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.handleServiceContentsChange = this.handleServiceContentsChange.bind(this);
      this.handleAddSchedule = this.handleAddSchedule.bind(this);
      this.refresh = this.refresh.bind(this);
  }  
  componentWillReceiveProps(newProps){
    console.log('Schedule receives new user id:' + newProps.current_user);
    this.setState({
      user_id: newProps.current_user
    });
    this.refresh(newProps.current_user);
  }
  refresh(user_id) {
      getScheduleData(user_id, (scheduleData) => {
              this.setState({
                schedules: scheduleData
              });
          });
  }

  componentDidMount() {
      this.refresh(this.state.user_id)
    }


    handleAddSchedule(){
      postSchedule(this.state,(userInfo)=>{
        console.log(JSON.stringify(userInfo));
      });
      this.refresh(this.state.user_id);
    }


    handleAuthorChange(event) {
      event.preventDefault();
      var newAuthor = event.target.value;
      this.setState({
        author: newAuthor
      });
    }

    handleSubscriberChange(event) {
      event.preventDefault();
      var newSubscriber = event.target.value;
      this.setState({
        subscriber: newSubscriber
      });
    }

    handleDateChange(event) {
      event.preventDefault();
      var newDate = event.target.value;
      this.setState({
        date: newDate
      });
    }

    handleTimeChange(event) {
      event.preventDefault();
      var newTime = event.target.value;
      this.setState({
        time: newTime
      });
    }

    handleServiceContentsChange(event) {
      event.preventDefault();
      var newServiceContents = event.target.value;
      this.setState({
        serviceContents: newServiceContents
      });
    }

  render(){
    return(
      <div>
      <div className="container content">
        { this.state.schedules.map((scheduleItem,i) => {
         return(
           <Schedulebox key = {i} name={scheduleItem.contents.author} postDate={scheduleItem.contents.date}
             serviceContent={scheduleItem.contents.serviceContents} time={scheduleItem.contents.time}
             subscriber={scheduleItem.contents.subscriber}
            completed={scheduleItem.completed} id ={scheduleItem.index}   />
        );
      })
    }
        </div>

        <div className="col-xs-3">
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
                      <input type="text" className="form-control" value={this.state.author} onChange={this.handleAuthorChange}/>
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
                      <input type="text" className="form-control" value={this.state.subscriber} onChange={this.handleSubscriberChange} />
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
                      <input type="text" className="form-control" value={this.state.date} onChange={this.handleDateChange} />
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
                        <input type="text" className="form-control" value={this.state.time} onChange={this.handleTimeChange} />
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
                <input type="text" className="form-control" value={this.state.serviceContents} onChange={this.handleServiceContentsChange} />
            </div>
              </div>
            </div>
          <hr />
                <div className="text-center">
                  <div className="btn-group" role="group">
                    <button className="button-style" onClick={this.handleAddSchedule} >
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
