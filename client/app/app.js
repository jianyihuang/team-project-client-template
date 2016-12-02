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
import {searchForFeedItems, deleteFeedItem} from './server';
import FeedItem from './components/feeditem';
import ServiceHome from './components/servicehome.js'
import ErrorBanner from './components/errorbanner';
import { IndexRoute,Router,Route,browserHistory } from 'react-router';

// Temporarily used until we learn proper way to authenticate.


/**
 * Search results page.
 */
class SearchResultsPage extends React.Component {

  getSearchTerm() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = "";
    if (queryVars && queryVars.q) {
      searchTerm = queryVars.q;
      // Remove extraneous whitespace.
      searchTerm.trim();
    }
    return searchTerm;
  }

  render() {
    var searchTerm = this.getSearchTerm();
    // By using the searchTerm as the key, React will create a new
    // SearchResults component every time the search term changes.
    return (
      <SearchResults key={searchTerm} searchTerm={searchTerm} />
    );
  }
}
class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      invalidSearch: false,
      results: []
    };
  }

  deleteFeedItem(id) {
    deleteFeedItem(id, () => {
      this.refresh();
    });
  }

  refresh() {
    var searchTerm = this.props.searchTerm;
    if (searchTerm !== "") {
      // Search on behalf of user 4.
      searchForFeedItems(4, searchTerm, (feedItems) => {
        this.setState({
          loaded: true,
          results: feedItems
        });
      });
    } else {
      this.setState({
        invalidSearch: true
      });
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <link href="css/service.css" rel="stylesheet"/>
        {/* <div className={hideElement(this.state.loaded || this.state.invalidSearch)}>Search results are loading...</div>
        <div className={hideElement(!this.state.invalidSearch)}>Invalid search query.</div> */}
        {/* <div className={hideElement(!this.state.loaded)}> */}
        <div>
          <h2>Search Results for {this.props.searchTerm}</h2>

          <h2>Found {this.state.results.length} results.</h2></div>
        {
          this.state.results.map((feedItem) => {
            return (

              <FeedItem key={feedItem._id} data={feedItem} onClick={() => this.handleDeleteFeed(feedItem._id)} />
            )
          })
        }
        </div>
      // </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <div className="row">
          <div className="col-md-12">
            <ErrorBanner />
          </div>
        </div>
      </div>
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
      <Route path="search" component={SearchResultsPage} />
    </Route>
  </Router>
  ),document.getElementById('App')
);
