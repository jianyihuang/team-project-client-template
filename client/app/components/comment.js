import React from 'react';
import {getCommentData} from '../server';
import {unixTimeToString} from '../util';
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "comment":Object
    }
    getCommentData(props.data,1,(comment)=>{
       this.setState({"comment":comment})
    })
  }
  render() {
    var comment = this.state.comment;
    if(comment.contents !== undefined){
      return (
        <li className="media">
          <div className="media-left media-top" />
          <div className="meida-body">
            <a href="#">{comment.author.username}</a>
              {" "+comment.contents}
              <br/>
              <i className = "post-time">{unixTimeToString(comment.timestamp)}</i>
          </div>
        </li>
      );
    }else {
      return (
        <li className="media" />
      );
    }
  }
}
