import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import DetailPage from './components/detailpage';
import Navbar from './components/navbar';
import MessagePanel from './components/message_panel';
import Schedule from './components/schedule';
import Profile from './components/profile';
import LoginPage from './components/login';
import Config from './components/config';
import ServiceHome from './components/servicehome.js'

import { IndexRoute,Router,Route,browserHistory } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}</div>
    )
  }
}

class CategoryBoxPage extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="css/academic.css"/>
        <CategoryBox />
      </div>
    );
  }
}

class AcademicDetailPage extends React.Component {
  render() {
    return(
      <div>
        <link href="css/detail_page.css" rel="stylesheet"/>
        <DetailPage type={1}/>
      </div>
    );
  }
}

class ServiceHomePage extends React.Component{
  render(){
  return(
    <div>
      <link href="css/service.css" rel="stylesheet"/>
      <ServiceHome/>
    </div>
    )
  }
}

class ServiceDetailPage extends React.Component {
  render() {
    return(
      <div>
        <link href="css/service_detail_page.css" rel="stylesheet"/>
        <DetailPage type={2}/>
      </div>
    );
  }
}

class WelcomePage extends React.Component {
  render() {
    return(
      <div>
        <link href="css/login.css" rel="stylesheet"/>
        <LoginPage/>
      </div>
    );
  }
}

class MessagePage extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/message.css"/>
        <MessagePanel />
      </div>
      );
  }
}

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <link href="css/user-profile.css" rel="stylesheet"/>
        <Profile user={1}/>
      </div>
    );
  }
}

class SchedulePage extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/schedule.css"/>
        <Schedule />
      </div>
      );
  }
}

class ConfigPage extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/config.css" />
          <Config/>
      </div>
    );
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoryBoxPage} />
      <Route path="/login" component={WelcomePage} />
      <Route path="/acedemicdetail" component={AcademicDetailPage} />
      <Route path="/servicedetail" component={ServiceDetailPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/config" component={ConfigPage} />
      <Route path="/service_detail" component={AcademicDetailPage} />
      <Route path="/categorybox" component={CategoryBoxPage} />
      <Route path="/servicehome" component={ServiceHomePage} />
    </Route>
  </Router>
  ),document.getElementById('App')
);