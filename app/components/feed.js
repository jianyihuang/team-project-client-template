import React from 'react';
import FeedItem from './feeditem';
import {getFeedData}from '../server';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_of_feeditems:[]
    };
  }

  refresh() {
    getFeedData(this.props.user,1, (feedData) => {
      this.setState(feedData);
    });
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    return(
      <div>
        {this.state.list_of_feeditems.map((feedItem) => {
              return (
                <FeedItem key={feedItem._id} data={feedItem} />
              )
            })}
      </div>
    )
  }
}
