import React from 'react';
import {getCommentData} from '../server';
import {unixTimeToString} from '../util';
export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: props.current_user,
            "comment": Object
        }
        getCommentData(props.data, props.current_user, (comment) => {
            // console.log(comment);
            this.setState({"comment": comment})
        })
    }
    render() {
        var comment = this.state.comment;
        if (comment.contents !== undefined) {
            return (
                <li className="media">
                    <div className="media-left media-top">
                        <a href="#">
                            <img className="media-object" src={comment.author.profilepic} height="40px" width="40px"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <a href="#">{comment.author.username}</a>
                        {" " + comment.contents}
                        <br/>
                        <i className="post-time">{unixTimeToString(comment.timestamp)}</i>
                    </div>
                </li>
            );
        } else {
            return (<li className="media"/>);
        }
    }
}
