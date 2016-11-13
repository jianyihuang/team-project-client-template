import React from 'react';

export default class FeedItem extends React.Component {
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
                  Form Category: Computer Science
                  <a href="#"><span className="glyphicon glyphicon-remove pull-right"></span></a>
                  <br /><a href="#">Oh god! CS311 homework is too hard! PlZZZ help</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-feed">
            You are consulting for a trucking company that does a large amount
             of business shipping packages between New York and Boston.
             The volume is high enough that they have to send a number of trucks
             each day between the two locations. Trucks have a fixed limit W on
             the maximum amount of weight they are allowed to carry. Boxes arrive
             at the New York station one by one, and each package i has a weight
             wi. The trucking station is quite small, so at most one truck can be
             at the station at any time. Company policy requires that boxes are ...
             <a href="#">Show more</a>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline icon-status">
                <li>
                  <span className="glyphicon glyphicon-eye-open"></span>
                  <a href="#">25 Views</a>
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
                  <a href="#">Like</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
