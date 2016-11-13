import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import AcademicDetail from './components/academicdetail';
import Navbar from './components/navbar';
import Message from './components/message';
import Schedule from './components/schedule';
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


class MessagePage extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/message.css"/>
        <Message />
      </div>
      );
  }
}

class ProfilePage extends React.Component {
  render() {
    return (<p>This is a Profile Page</p>);
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
    return (<p>This is a Config Page</p>);
  }
}

class PostPage extends React.Component {
  render() {
    return (<p>This is a Post Page</p>);
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
      <Route path="/post" component={PostPage} />
    </Route>
  </Router>
  ),document.getElementById('App')
);
