import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Popover, InputGroup, Button, FormControl, Glyphicon } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setCurrentSearch } from '../../actions/log';

class SearchDropdown extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      searchValue: this.props.search,
      dropdownOpen: false
    };
    _.bindAll(this, 'handleSearchToggle', 'handleSearchUpdate', 'toggleSearchDropdown', 'handleSearchKeyDown');
  }

  handleSearchToggle(isOpen, event, {source}) {
    if (source !== 'select') {
      this.toggleSearchDropdown();
    }
    ReactDOM.findDOMNode(this.refs.searchInput).focus();
  }

  handleSearchUpdate() {
    this.props.setCurrentSearch(this.state.searchValue);
  }

  toggleSearchDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleSearchKeyDown(event) {
    if (event.keyCode === 13) { // Enter: commit search and close
      this.handleSearchUpdate();
      this.toggleSearchDropdown();
    } else if (event.keyCode === 27) { // Escape: clear search and commit
      this.setState({searchValue: this.props.search});
      this.toggleSearchDropdown();
    }
  }

  render() {
    const popover = (
      <Popover id="grep-popover">
        <InputGroup>
          <FormControl
            ref="searchInput"
            type="text"
            placeholder="Grep logs"
            value={this.state.searchValue}
            onKeyDown={this.handleSearchKeyDown}
            onChange={(event) => this.setState({searchValue: event.target.value})}
          />
          <InputGroup.Button>
            <Button
              bsStyle="info"
              onClick={this.handleSearchUpdate}
            >
              <Glyphicon glyph="search" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={popover}>
        <Button
          bsSize="small"
          bsStyle={this.props.search ? 'info' : 'default'}
        >
          <Glyphicon glyph="search" /> <span className="caret" />
        </Button>
      </OverlayTrigger>
    );
  }
}

SearchDropdown.propTypes = {
  search: React.PropTypes.string.isRequired,
  setCurrentSearch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

const mapDispatchToProps = { setCurrentSearch };

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchDropdown);
