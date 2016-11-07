import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import { IndexRoute,Router,Route,browserHistory } from 'react-router';

class ProfilePage extends React.Component {
  render() {
    return (
      <p>This is the profile page for a user
         with ID {this.props.params.id}.</p>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class CategoryBoxPage extends React.Component {
  render() {
    return <CategoryBox />;
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={CategoryBoxPage} />
      <Route path="profile/:id" component={ProfilePage} />
      </Route>
    </Router>
  ),document.getElementById('categories-box')
);
