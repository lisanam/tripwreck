import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchInputChange } from '../../actions';
import { Input, Card, CardSection } from '../common';

class SearchBar extends Component {

  onSearchInputChange(text) {
    this.props.searchInputChange(text);
  }

  render() {
    return(
      <Card>
        <CardSection>
          <Input
            placeholder="Enter Restaurant"
            value={this.props.searchInput}
            onChangeText={this.onSearchInputChange.bind(this)}
          />
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { searchInput } = state;
  return searchInput;
}

export default connect(mapStateToProps, { searchInputChange })(SearchBar);
