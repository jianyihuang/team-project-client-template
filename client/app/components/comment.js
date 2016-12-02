import React from 'react';

export default class Comment extends React.Component {
  render() {
    return (
      <li className="media">
        <div className="media-left media-top" />
        <div className="meida-body">
          <a href="#">Jucong </a>
            hope everything is ok!
            <br/>
            <i className = "post-time">20 hrs</i>
        </div>
      </li>
    );
  }
}
