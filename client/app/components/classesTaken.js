import React from 'react';

export class ClassesTaken extends React.Component{
  render(){
    return (
        <div className="row">
          <span className="glyphicon glyphicon-ok">{this.props.course_id}: {this.props.course_title}</span>
        </div>
    );
  }
}
