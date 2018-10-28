/* @flow */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import {createStackNavigator} from 'react-navigation';

type Props = {};
export default class SerarchPage extends Component<Props> {
  static navigationOptions = {
    title: 'Property Finder'
  }

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      message: '',
      isLoading: false
    }
  }

  onSearchStringChange = (event) => {
    this.setState({searchString: event.nativeEvent.text})
  }

  executeQuery(query){
    //console.log(query);
    this.setState({isLoading: true})
    fetch(query)
      .then(response => response.json())
      .then(json => this.handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happen' + error}))
  }

  handleResponse = (response) => {
    this.setState({isLoading: false, message: ''});
    if(response.application_response_code.substr(0, 1) === '1') {
      //console.log('Properties found:   ' + response.listings.length);
      this.props.navigation.navigate(
        'Result', {listings: response.listings}
      );
    }
    else {
      this.setState({message: 'Location not recognize, please try again.'});
    }
  }

  urlForQueryAndPage(key, value, pageNumber){
    const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
    }
    data[key] = value;
    const queryString = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');
    return 'https://api.nestoria.co.uk/api?' + queryString;
  }

  buttonPressHandler = () => {
    const query = this.urlForQueryAndPage('place_name',this.state.searchString,1);
    this.executeQuery(query);
  }

  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size="large" color="#48BBEC" /> : null
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Search for house buy!</Text>
        <Text style={styles.description}>Search by name or postalcode.</Text>
        <View style={styles.formContainer}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchStringChange}
            placeholder='Search via name or postal code'/>
          <TouchableOpacity
            style={styles.button}
            onPress={this.buttonPressHandler}>
            <Text style={styles.buttonText}>GO!</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('./../resources/img/house.png')}
        />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    margin: 5,
    fontSize: 18,
    color: '#656565',
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  searchInput: {
    height: 36,
    fontSize: 18,
    borderColor: '#48BBEC',
    borderWidth: 1,
    flex: 1,
    padding: 4,
    color: '#48BBEC',
    marginRight: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#48BBEC',
    padding: 9,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
  },
});
