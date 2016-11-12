import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import AcademicDetail from './components/academicdetail';
import Navbar from './components/navbar';
import Message from './components/message';
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
    return <CategoryBox />;
  }
}

class AcademicDetailPage extends React.Component {
  render() {
    return <AcademicDetail />;
  }
}


class MessagePage extends React.Component {
  render() {
    return (
      <Message />
      );
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoryBoxPage} />
      <Route path="/acedemicdetail" component={AcademicDetailPage} />
      <Route path="/message" component={MessagePage} />
    </Route>
  </Router>
  ),document.getElementById('App')
);
