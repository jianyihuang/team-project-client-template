import React from 'react';

export default class Contents extends React.Component {
    render() {
        var data = this.props.data;
        if (data.contents.imgUrl === "") {
            return (
                <div className="row">
                    <div className="col-md-12 text-feed">
                        {data.contents.contents}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row feed_with_img">
                    <div className="col-md-4">
                        <img className="img-rounded" src={data.contents.imgUrl} width="100%" height="112"/>
                    </div>
                    <div className="col-md-8 text-feed">
                        {data.contents.contents}
                    </div>
                </div>
            )
        }
    }
}
