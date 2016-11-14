import React from 'react';
// import FeedItem from './feeditem';
import Feed from './feed';
import Recommendation from './recommendation';

export default class ServiceDetail extends React.Component{
  constructor(props){
  super(props);
  this.state ={
    value:""
  };
}
  handlePost(e){
    e.preventDefault();
    var writeRequestText = this.state.value.trim();
      if(writeRequestText !== ""){
      this.setState({value: ""});
  }
  }
  handleChange(e){
    e.preventDefault();
    this.setState({value:e.target.value});
}


render(){
    return(
      <div className="container">
        <div className="col-md-9">

          <div className="widget-area no-padding blank" id ="myModal">
            <div className="status-upload">
              <form>
                <textarea placeholder="What would you like help with?"
                  row="2"
                  value={this.state.value}
                  onChange = {(e) => this.handleChange(e)}>

                </textarea>
                <ul>
                  <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Academic"><span className="glyphicon glyphicon-book"></span></a></li>
                  <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Service"><span className="glyphicon glyphicon-tags"></span></a></li>
                  <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Image"><span className="glyphicon glyphicon-camera"></span></a></li>

                </ul>
                <button type="submit" className="btn btn-success green"  onClick ={(e) =>this.handlePost(e)}><i className="fa fa-share"></i> Post</button>

              </form>

              {/* </div><!-- Status Upload  --> */}
              {/* </div><!-- Widget Area --> */}
            </div>


          </div>
        </div>
        <div className="row">
          <div className="col-md-9">

            <div className="row">
              <div className="col-md-12 catergory_status">
                <span className="glyphicon glyphicon-th-list"></span>
                Newest Requests
              </div>
            </div>
            <Feed user={1}/>
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="row">
                    <div className="col-md-12 catergory_status">
                      <span className="glyphicon glyphicon-sunglasses"></span>
                      Recommendation
                    </div>
                  </div>
                </div>
                <div className="list-group">
                  <Recommendation />
                  <Recommendation />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


}
