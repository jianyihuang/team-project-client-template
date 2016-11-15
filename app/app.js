import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import AcademicDetail from './components/academicdetail';
import Navbar from './components/navbar';
import MessagePanel from './components/message_panel';
import Schedule from './components/schedule';
import Profile from './components/profile';
import ServiceDetail from './components/servicedetail';
import Config from './components/config';
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
        <AcademicDetail />
      </div>
    );
  }
}

class ServiceDetailPage extends React.Component {
  render() {
    return(
      <div>
        <link href="css/service_detail_page.css" rel="stylesheet"/>
        <AcademicDetail/>
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
        <Profile />
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
    return (<Config/>);
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoryBoxPage} />
      <Route path="/acedemicdetail" component={AcademicDetailPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/config" component={ConfigPage} />
      <Route path="/service_detail" component={ServiceDetailPage} />

    </Route>
  </Router>
  ),document.getElementById('App')
);
