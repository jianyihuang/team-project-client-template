import React from 'react';
import {getUserData, saveUserData} from '../server';
import {resetDatabase} from '../database';


export default class Profile extends React.Component{
      constructor(props){
        super(props);
          this.state = {
            user_id: props.current_user,
            editing: false,
            first_name: '',
            last_name: '',
            profilepic: '',
            favorite_quote: '',
            areas_of_interest: [],
            classes_taken: [],
            education_level: '',
            academic_institution: '',
            classToAdd : [],

          }

          this.handleSave = this.handleSave.bind(this);
          this.handleCancel = this.handleCancel.bind(this);
          this.handleSchool = this.handleSchool.bind(this);
          this.handleYear = this.handleYear.bind(this);
          this.handleQuote = this.handleQuote.bind(this);
          this.changeUser = this.changeUser.bind(this);
          this.handleAddClasses = this.handleAddClasses.bind(this);
          this.handleClassSelect = this.handleClassSelect.bind(this);
          this.refresh = this.refresh.bind(this);
      }

      hideElement(shouldHide) {
        if(shouldHide)
          return 'hidden';
        else {
          return '';
        }
      };

      handleSave() {
        this.setState({
          editing: false
        });
        saveUserData(this.state, (user_data) => {
          console.log('Saved data into database');
          // console.log(JSON.stringify(user_data));
        });

      }
      handleCancel() {
        this.refresh(this.state.user_id);
      }
      componentDidMount() {
        console.log('Mounted: ' + this.state.user_id);
        this.refresh(this.state.user_id);
      }
      componentWillReceiveProps(newProps){
        console.log('Profile receives new user id:' + newProps.current_user);
        this.setState({
          user_id: newProps.current_user
        });
        this.refresh(newProps.current_user);
      }
      refresh(user_id){
        getUserData(user_id, (user_data) => {
          // console.log(JSON.stringify(user_data));
          this.setState({
            editing: false,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            profilepic: user_data.profilepic,
            favorite_quote: user_data.favorite_quote,
            areas_of_interest: user_data.areas_of_interest,
            classes_taken: user_data.classes_taken,
            education_level: user_data.education_level,
            academic_institution: user_data.academic_institution,
            classToAdd: [],
          });
        });
      }
      //called when submit button next to class list


      // Called when text in text field 'Academic Institution' changed.
  handleSchool(event) {
    event.preventDefault();
    this.setState({
      editing: true,
      academic_institution: event.target.value
    });
  }

      // Called when text in text field 'Academic Level' changed.
  handleYear(event) {
    event.preventDefault();
    this.setState({
      editing: true,
      education_level: event.target.value
    });
  }

     // Called when text in text field 'Quote' changed.
  handleQuote(event) {
    event.preventDefault();
    this.setState({
      editing: true,
      favorite_quote: event.target.value
    });
  }

  //called when user hits add classes in modal box
handleClassSelect(e, cb, idx, aclass) {
  event.preventDefault();
  console.log(aclass);
  console.log(cb.item(idx).checked);
  if(cb.item(idx).checked){
    if(this.state.classToAdd.indexOf(aclass)==-1){
      this.state.classToAdd.push(aclass);
      console.log(this.state.classToAdd);
    }
  } else {
    var classIdx = this.state.classToAdd.indexOf(aclass);
    if(classIdx !== -1)
      this.state.classToAdd.splice(classIdx, 1);
  }
}

//called when user hits add classes button in modal box
handleAddClasses(event) {
  event.preventDefault();
  this.setState({
    editing: true,
    classes_taken: this.state.classes_taken.concat(this.state.classToAdd),
  });
  console.log(this.state.classes_taken);

}






// When user hits Enter, information will be saved.
  // handleKeyUp(event) {
  //   if(event.key === "Enter"){
  //     var school =document.getElementById('schoolInput').value.trim();
  //     var year = document.getElementById('yearInput').value.trim();
  //     var quote = document.getElementById('quoteInput').value.trim();
  //     saveUserData(1, school, year, quote, (user) => {
  //       this.setState(
  //         user: user
  //       );
  //     });
  //   }
  // }

    changeUser(event){
        var user = event.target.value;
        if(user !== '') {
          this.setState({
              user_id: Number(user)
          });
        }
    }

  render() {
    // return (<div>None</div>);
    var classList = ["CS311", "CS326", "MATH132", "PHYSICS151", "ENGLISH112", "MATH411"];
    return (
      <div className = "container">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-3">
                  </div>
                  <div className="col-md-6">
                    <div className="additionalPadding">
                      <div className="profile-pic">
                        <img src={this.state.profilepic} alt="profile-pic" className="img-thumbnail img-responsive profile-pic-size"/>

                      <span className="glyphicon glyphicon-camera"></span>Edit Picture
                      </div>
                    </div>
                  </div>
                <div className="col-md-3">
                </div>
              </div>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-md-3 control-label"> First Name</label>
                  <div className="col-md-7">
                    {this.state.first_name}
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label"> Last Name</label>
                    <div className="col-md-7">
                      {this.state.last_name}
                    </div>
                  </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Level</label>
                <div className="col-md-5">
                  <input className="form-control expandable" id="yearInput" type="text" placeholder="What level are you?"
                    value={this.state.education_level} onChange={this.handleYear}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Academic Institution</label>
                <div className="col-md-7">
                  <input className="form-control expandable" id="schoolInput" type="text" placeholder="What school do you go to?"
                    value={this.state.academic_institution} onChange={this.handleSchool}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Favorite Quote</label>
                <div className="col-md-7">
                  <textarea className="form-control expandable" id="quoteInput" type="text" placeholder="What's your favorite quote?"
                    value = {this.state.favorite_quote} onChange={this.handleQuote}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label"> Areas of Interest</label>
                  <div className="col-md-7">
                    {this.state.areas_of_interest.join(', ')}
                  </div>
                </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Classes Taken</label>
                  <div className="col-md-7">
                    <ul>
                      {this.state.classes_taken.map((aclass, i) => (
                        <li key={i}>{aclass}</li>
                      ))
                    }
                  </ul>



                    <button className="btn btn-default" data-toggle="modal" data-target="#myClasses">Add More</button>
                      <div id="myClasses" className="modal fade" role="dialog">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-header">
                                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                                      <font size="5">Add classes</font>
                                  </div>
                                  <div className="modal-body">

                                    {classList.map((aclass, i)=> (
                                      <label key={i} className="checkbox-inline">
                                        <input type="checkbox" id="aclassBox" onClick={(e)=>{this.handleClassSelect(e, aclassBox, i, aclass)}}/>{aclass}
                                      </label>
                                    ))
                                  }

                                  </div>
                                  <div className="modal-footer text-center">
                                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleAddClasses} >Add classes</button>
                                  </div>
                              </div>
                          </div>
                      </div>


                  </div>
                </div>
              </form>


            <div className="col-md-12 text-center editBtns" id="editBtns">
              <span className={this.hideElement(!this.state.editing)}>
                      <button type="button" className="btn btn-success btn-sm" onClick={this.handleSave}>Save
                        <span className="glyphicon glyphicon-ok"></span>
                      </button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={this.handleCancel}>Cancel
                        <span className="glyphicon glyphicon-remove"></span>
                      </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    	<div className="col-md-3">
      </div>
    </div>
  </div>


    );
  }



}
