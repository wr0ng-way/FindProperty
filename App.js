/* @flow */
import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SearchPage from './src/components/SearchPage';
import SearchResult from './src/components/SearchResult';
import PropertyResult from './src/components/PropertyResult';

const App = createStackNavigator({
  home: {screen: SearchPage},
  Result: {screen: SearchResult},
  Property: {screen: PropertyResult},
});

export default App;
