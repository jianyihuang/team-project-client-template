import React from 'react';
import FeedItem from './feeditem';
import PostUpdateEntry from './postupdateentry';
import {getFeedData}from '../server';
import {postStatusUpdate} from "../server";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    console.log('Current user in Feed:' + props.current_user);
    this.state = {
      current_user: this.props.current_user,
      list_of_feeditems:[]
    };
    this.refresh = this.refresh.bind(this);
  }
  componentWillReceiveProps(newProps) {
    console.log('Feed receives new user id: ' + newProps.current_user);
    this.setState({
      current_user: newProps.current_user
    });
    getFeedData(newProps.current_user,this.props.type, (feedData) => {
      this.setState(feedData);
    });
  }
  onPost(postContents) {
    if(postContents.type === 1) {
      postStatusUpdate(this.state.current_user,postContents,1,() => {
        this.refresh();
      });
    }else{
      postStatusUpdate(this.state.current_user,postContents,2,() => {
        this.refresh();
      });
    }
  }

  refresh() {
    getFeedData(this.state.current_user,this.props.type, (feedData) => {
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
              // console.log('Feed Items Data:' + JSON.stringify(feedItem));
              return (
                <FeedItem key={feedItem._id} data={feedItem} type={this.props.type}
                   refresh = {()=> this.refresh()} current_user={this.state.current_user}/>
              )
            })}
      </div>
    )
  }
}
