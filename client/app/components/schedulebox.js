import React from 'react';
import {deleteSchedule} from '../server';

export class Schedulebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props
        this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this)
    }

    handleDeleteSchedule(clickEvent) {
        clickEvent.preventDefault();
        if (clickEvent.button === 0) {
            deleteSchedule(this.props.user_id, this.props.id, () => {
                console.log('Schedule deletion called!');
                this.props.refresh(this.props.user_id);
            });
        }
    }

    render() {
        return (
            <div className="col-md-3 text-center">
                <div className="panel panel-default whole-tab">
                    <div className="panel-body">
                        <span className="tab-title">{this.props.name}</span>
                        <br/>
                        <span className="taken-by">{this.props.postDate}</span><br/>
                        <span className="tab-subject">{this.props.serviceContent}</span>
                        <br/>
                        <span className="regular-text">{this.props.time}</span><br/>
                        <span className="taken-by">APPOINTMENT WITH</span>
                        <br/>
                        <span className="taken-by">{this.props.subscriber}</span><br/>
                        <hr/>
                        <button type="button" className="btn btn-primary completed-button">
                            <strong onClick= {(e) => this.handleDeleteSchedule(e)}>
                                {this.props.completed}</strong>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
