import React from 'react';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              <div className="media">
                <div className="media-left media-top">
                  <img className="media-object img-rounded" src="img/jucong_back.jpg" width="64" height="64" />
                </div>
                <div className="media-body">
                  Form Category: {this.state.tag.type_of_service}
                  <a href="#"><span className="glyphicon glyphicon-remove pull-right"></span></a>
                  <br /><a href="#">{this.state.contents.request}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-feed">
              {this.state.contents.contents}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline icon-status">
                <li>
                  <span className="glyphicon glyphicon-eye-open"></span>
                  <a href="#">{this.state.view_count} Views</a>
                </li>
                <li>
                  <span className="glyphicon glyphicon-share-alt"></span>
                  <a href="#">Share</a>
                </li>
                <li>
                  <span className="glyphicon glyphicon-heart-empty"></span>
                  <a href="#">Save</a>
                </li>
                <li>
                  <span className="glyphicon glyphicon-thumbs-up"></span>
                  <a href="#">{this.state.likeCounter.length} Like</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
