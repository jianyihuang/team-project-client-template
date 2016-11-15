import React from 'react';
import {Schedulebox} from './schedulebox';
import {getScheduleData} from '../server';
//import {resetDatabase} from '../database';


export default class Schedule extends React.Component {
  constructor(props) {
      super(props);
      this.state = {current_user:1, schedules: []};
  }

    refresh() {
      getScheduleData(1, (scheduleData) => {
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
            endTime={scheduleItem.contents.timestamp_end} party={scheduleItem.contents.serviceContents}
            completed={scheduleItem.completed}   />
        );
      })
    }
        </div>
      </div>
    )
  }
}
