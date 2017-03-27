import React from 'react';
import { ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import SearchResults from './SearchResults'

export default SearchPage = () => (
  <ScrollView>
    <Card>
      <SearchBar />
      <SearchButton />
    </Card>
    <Card>
      <SearchResults />
    </Card>
  </ScrollView>
);
