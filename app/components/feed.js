import React from 'react';
import FeedItem from './feeditem';
import PostUpdateEntry from './postupdateentry';
import {getFeedData}from '../server';
import {postStatusUpdate} from "../server";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_of_feeditems:[]
    };
  }

  onPost(postContents) {
    if(postContents.type === 1) {
      postStatusUpdate(1,postContents,1,() => {
        this.refresh();
      });
    }else{
      postStatusUpdate(1,postContents,2,() => {
        this.refresh();
      });
    }
  }

  refresh() {
    getFeedData(this.props.user,1, (feedData) => {
      // console.log(feedData);
      this.setState(feedData);
    });
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    return(
      <div>
        <PostUpdateEntry onPost = {(postContents) => this.onPost(postContents)} />
        {this.state.list_of_feeditems.map((feedItem) => {
              return (
                <FeedItem key={feedItem._id} data={feedItem} />
              )
            })}
      </div>
    )
  }
}
