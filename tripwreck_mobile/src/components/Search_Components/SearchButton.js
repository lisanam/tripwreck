import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRestaurant } from '../../actions';
import { Button, CardSection } from '../common';

class SearchButton extends Component {

  onButtonPress() {
    const { searchInput } = this.props;
    this.props.searchRestaurant(searchInput);
  }

  render() {
    return (
      <CardSection>
        <Button
          onPress={this.onButtonPress.bind(this)}
        >
        Search
        </Button>
      </CardSection>
    )
  }
};


const mapStateToProps = (state) => {
  const { searchInput } = state;
  return searchInput;
}

export default connect(mapStateToProps, { searchRestaurant })(SearchButton);
