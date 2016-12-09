import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: props.searchTerm };
}
handleSearchButtonClick(e) {
    e.preventDefault();
    this.search();
  }
  search() {
    var trimmedTerm = this.state.searchTerm.trim();
    if (trimmedTerm !== "") {
      // Navigate to /search?q=[trimmedTerm]
      this.context.router.push({ pathname: "/search", query: { q: trimmedTerm } });
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  }
  componentWillReceiveProps(newProps) {
      if (newProps.searchTerm !== null) {
        // Keep searchTerm in-sync with component changes.
        this.setState({
          searchTerm: newProps.searchTerm
        });
      }
    }
    handleKeyUp(e) {
      e.preventDefault();
      if (e.key === "Enter") {
        this.search();
      }
    }

  render(){
    return(
      <form onSubmit={(evt) => evt.preventDefault()} className="navbar-form navbar-left" role="search">
        <div className="input-group">
          <input type="text" className="form-control exSer-search" placeholder="Search for feed" value={this.state.searchTerm} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}  />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default" onClick={(e) => this.handleSearchButtonClick(e)}>
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>


);
}
}
// Tell React-Router that SearchBar needs to use the router dynamically.
SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
