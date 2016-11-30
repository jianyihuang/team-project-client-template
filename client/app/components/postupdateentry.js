import React from 'react';

export default class PostUpdateEntry extends React.Component {
  constructor(props){
  super(props);
  this.state ={
    value:"",
    type:0,
    imgUrl:"",
    title:"",
    activebtn:""
  };
}

handlePost(e){
    e.preventDefault();
    var writeRequestText = this.state.value.trim();
      if(writeRequestText !== "" && this.state.type !== 0
        &&this.state.title !== ""){
        this.props.onPost(this.state);
        this.setState({value: ""});
        this.setState({title: ""});
  }
}

handleChange(e){
  e.preventDefault();
  this.setState({value:e.target.value});
}

handleTitleChange(e) {
  e.preventDefault();
  this.setState({title:e.target.value});
}
handleAcademic(e) {
  e.preventDefault();
  this.setState({type:1,activebtn:"academic"});
}

handleService(e) {
  e.preventDefault();
  this.setState({type:2,activebtn:"service"});
}

handleImg(e) {
  e.preventDefault();
  this.setState({imgUrl:"img/question_img.jpeg"})
}

checkActive(btn) {
  if(btn === this.state.activebtn) {
    return " btn btn-default activeBtn";
  }else {
    return "btn btn-default";
  }
}
  render() {
    return(
      <div className="row">
        <div className="widget-area no-padding blank" id ="myModal">
          <div className="status-upload">
            <form>
              <textarea placeholder="Enter the tiltle for this request"
                row="1"
                value={this.state.title}
                onChange = {(e) => this.handleTitleChange(e)}>
              </textarea>
              <textarea placeholder="What would you like help with?"
                row="2"
                value={this.state.value}
                onChange = {(e) => this.handleChange(e)}>
              </textarea>
              <div className="btn-group postCategoryBtn" role="group">
                <button type="button" className={this.checkActive("academic")} onClick= {(e) => this.handleAcademic(e)}>
                  <span className="glyphicon glyphicon-book"></span>
                   Academic
                </button>
                <button type="button" className= {this.checkActive("service")} onClick= {(e) => this.handleService(e)}>
                  <span className="glyphicon glyphicon-tags"></span>
                   Service
                </button>
                <button type="button" className= "btn btn-default" onClick= {(e) => this.handleImg(e)}>
                  <span className="glyphicon glyphicon-camera"></span>
                </button>
              </div>
              <button type="submit" className="btn btn-success green pull-right postCategoryBtn"
                onClick ={(e) =>this.handlePost(e)}>
                <i className="fa fa-share"></i>
                  Post
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}