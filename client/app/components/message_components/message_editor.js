import React from 'react';
import {postSchedule} from '../../server';

export class MessageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entered_text: '',
            author: "",
            subscriber: "",
            date: "",
            time: "",
            serviceContents: ""
        };
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

    }
    // End: handleSchedule.
    handleChange(event) {
        event.preventDefault();
        this.setState({entered_text: event.target.value});
    }
    handleKeyUp(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            this.props.onMessageSend(this.state.entered_text);
            this.setState({entered_text: ''});
        }
    }
    handleMessageSend(event) {
        event.preventDefault();
        this.props.onMessageSend(this.state.entered_text);
        this.setState({entered_text: ''});

    }

    render() {
        return (
            <div>
                <textarea placeholder="Enter text to reply" value={this.state.entered_text} onKeyUp={this.handleKeyUp} onChange={this.handleChange}></textarea>
                <div className="btn-toolbar">
                    <div className="button-group">
                        <button className="form-control pull-left btn btn-primary" onClick={this.handleMessageSend}>
                            <span className="glyphicon glyphicon-pencil"></span>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
