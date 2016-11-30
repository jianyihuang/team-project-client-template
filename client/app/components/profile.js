import React from 'react';
import {getUserData, saveUserData, getClassData} from '../server';
import {resetDatabase} from '../database';
import {classesTaken} from './classesTaken';


const intial_user = 1;
export default class Profile extends React.Component{
      constructor(props){
        super(props);
          this.state = {
            user_id: intial_user,
            first_name: '',
            last_name: '',
            profilepic: '',
            favorite_quote: '',
            areas_of_interest: [],
            classes_taken: [],
            education_level: '',
            academic_institution: '',
          }
          this.handleSave = this.handleSave.bind(this);
          this.handleCancel = this.handleCancel.bind(this);
          this.handleSchool = this.handleSchool.bind(this);
          this.handleYear = this.handleYear.bind(this);
          this.handleQuote = this.handleQuote.bind(this);
          this.changeUser = this.changeUser.bind(this);
          this.refresh = this.refresh.bind(this);
      }
      handleSave() {
        saveUserData(this.state, (user_data) => {
          console.log('Saved data into database');
          // console.log(JSON.stringify(user_data));
        });
      }
      handleCancel() {
        getUserData(this.state.user_id, (user_data) => {
          console.log(JSON.stringify(user_data));
          this.setState({
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            profilepic: user_data.profilepic,
            favorite_quote: user_data.favorite_quote,
            areas_of_interest: user_data.areas_of_interest,
            classes_taken: user_data.classes_taken,
            education_level: user_data.education_level,
            academic_institution: user_data.academic_institution,
          });
        });
      }
      componentDidMount() {
        console.log('Mounted: ' + this.state.user_id);
        getUserData(this.state.user_id, (user_data) => {
          console.log(JSON.stringify(user_data));
          this.setState({
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            profilepic: user_data.profilepic,
            favorite_quote: user_data.favorite_quote,
            areas_of_interest: user_data.areas_of_interest,
            classes_taken: user_data.classes_taken,
            education_level: user_data.education_level,
            academic_institution: user_data.academic_institution,
          });
        });
      }
      refresh(){
        getUserData(this.state.user_id, (user_data) => {
          console.log(JSON.stringify(user_data));
          this.setState({
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            profilepic: user_data.profilepic,
            favorite_quote: user_data.favorite_quote,
            areas_of_interest: user_data.areas_of_interest,
            classes_taken: user_data.classes_taken,
            education_level: user_data.education_level,
            academic_institution: user_data.academic_institution,
          });
        });
      }
      //called when submit button next to class list


      // Called when text in text field 'Academic Institution' changed.
  handleSchool(event) {
    event.preventDefault();
    this.setState({
      academic_institution: event.target.value
    });
  }

      // Called when text in text field 'Academic Level' changed.
  handleYear(event) {
    event.preventDefault();
    this.setState({
      education_level: event.target.value
    });
  }

     // Called when text in text field 'Quote' changed.
  handleQuote(event) {
    event.preventDefault();
    this.setState({
      favorite_quote: event.target.value
    });
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
    return (
      <div className = "container">
        <div className="row">
          <div className="col-md-3">
            <p><button type='button' onClick={resetDatabase}> Reset Database</button></p>
            <p>UserID: <input type='text' size='3' maxLength='1' defaultValue={intial_user} onChange={this.changeUser}/></p>
            <p><button type='button' onClick={this.refresh}>Change User</button></p>
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
                  <input className="form-control expandable" id="quoteInput" type="text" placeholder="What's your favorite quote?"
                    value = {this.state.favorite_quote} onChange={this.handleQuote}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label"> Areas of Interest</label>
                  <div className="col-md-7">
                    {this.state.areas_of_interest}
                  </div>
                </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Classes Taken</label>
                <div className="col-md-7">

                  {this.state.classes_taken.map((classItem, i) => {
                    return <classesTaken key={i} courseid={classItem.course_id} courseTitle={classItem.course_title} />;
                  })}
                </div>
                <div className="col-md-7">
                    <div className="form-group">
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Math
                        </label>
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Music
                        </label>
                        <label className="checkbox-inline">
                          <input type="checkbox" value=""/>Biology
                        </label>
                    </div>
                    <select id="selClass" multiple="multiple">
                      <option id="CS311">CS311</option>
                      <option id="CS250">CS250</option>
                      <option id="MATH132">MATH132</option>
                      <option id="CS326">CS326</option>
                      <option id="MATH411">MATH411</option>
                    </select>
                    <button type = "button" onClick={this.handleClasses}>Submit</button>


                </div>
              </div>
            </form>

            <div className="col-md-12 text-center editBtns" id="editBtns">
                      <button type="button" className="btn btn-success btn-sm" onClick={this.handleSave}>Save
                        <span className="glyphicon glyphicon-ok"></span>
                      </button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={this.handleCancel}>Cancel
                        <span className="glyphicon glyphicon-remove"></span>
                      </button>
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
