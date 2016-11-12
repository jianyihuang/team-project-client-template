import React from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './components/categorybox';
import AcademicDetail from './components/academicdetail';
import { IndexRoute,Router,Route,browserHistory } from 'react-router';


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

class AcademicDetailPage extends React.Component {
  render() {
    return <AcademicDetail />;
  }
}

class MessagePage extends React.Component {
  render() {
    return (
      <div className="row">
        <div class="col-xs-2">
          <RecentContact/>
        </div>
        <div class="col-xs-8">
          <MessageBox/>
        </div>
      </div>
      );
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoryBoxPage} />
      <Route path="acedemicdetail" component={AcademicDetailPage} />
    </Route>
    </Router>
  ),document.getElementById('container-area')
);
