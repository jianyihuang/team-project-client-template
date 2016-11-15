import React from 'react';
import {unlikeFeedItem,likeFeedItem} from '../server';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  handleLikeClick(clickEvent) {
    console.log("Like clicked");
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
    var callbackFunction = (updatedLikeCounter) => {
    this.setState({likeCounter: updatedLikeCounter});
    };
    if (this.didUserLike()) {
    // User clicked 'unlike' button.
    unlikeFeedItem(this.state._id, 1, callbackFunction);
    } else {
      // User clicked 'like' button.
      likeFeedItem(this.state._id, 1, callbackFunction);
    }
  }
}

  didUserLike() {
  var likeCounter = this.state.likeCounter;
  var liked = false;
  // Look for a likeCounter entry with userId 4 -- which is the
  // current user.
  for (var i = 0; i < likeCounter.length; i++) {
    if (likeCounter[i]._id === 1) {
    liked = true;
    break;
    }
  }
    return liked;
  }

  render() {
    var likeButtonText = "Like";
      if (this.didUserLike()) {
        likeButtonText = "Unlike";
      }
    var data = this.state;
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
                  Form Category: {data.tag.type_of_service}
                  <a href="#"><span className="glyphicon glyphicon-remove pull-right"></span></a>
                  <br /><a href="#">{data.contents.request}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-feed">
              {data.contents.contents}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline icon-status">
                <li>
                  <span className="glyphicon glyphicon-eye-open"></span>
                  <a href="#">{data.view_count} Views</a>
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
                  <a href="#" onClick= {(e) => this.handleLikeClick(e)}>
                  {data.likeCounter.length} {likeButtonText}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
