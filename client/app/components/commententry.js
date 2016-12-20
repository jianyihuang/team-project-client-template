import React from 'react';
import {postComment} from '../server';
export default class CommentEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: props.current_user,
            value: ""
        };
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleKeyUp(e) {
        e.preventDefault();
        if (e.key === "Enter") {
            var comment = this.state.value.trim();
            if (comment !== "") {
                // Post comment
                postComment(this.props.feedItemId, this.state.value, this.state.current_user, (listOfComments) => {
                    // console.log(listOfComments);
                    this.props.handleCommentPost(listOfComments);
                });
                this.setState({value: ""});
            }
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({current_user: newProps.current_user});
    }

    render() {
        return (
            <div className="media">
                <div className="media-top"></div>
                <div className="media-body comment-entry">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Write a comment..." value={this.state.value} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}/>
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-default">
                                <span className="glyphicon glyphicon-camera"/>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
