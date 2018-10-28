import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

type Props = {};
class SearchResult extends Component<Props> {
  static navigationOptions = {
    title: 'Result',
  };

  keyExtractor = (item, index) => index.toString();

  navigationHandler = (property) => {
    this.props.navigation.navigate(
     'Property', { property: property  }
     ); 
  }
  

  renderItems = ({item}) => {
    return (
      <TouchableHighlight
        onPress={this.navigationHandler(item)}
        underlayColor='#dddddd'
        style={styles.items} >
        <View style={styles.rowContainer}>
          <Image source={{uri: item.thumb_url}}
            style={styles.thumbImage} />
          <View style={styles.textContainer}>
            <Text style={styles.priceText}>{item.price_formatted}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return(
      <FlatList
        data={params.listings}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItems}/>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    elevation: 5,
    marginTop: 1,
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
  thumbImage: {
    width: 80,
    height: 80,
    borderRadius: 2,
    marginRight: 10,
  },
  textContainer: {

  },
  priceText: {
   fontSize: 18,
    color: '#48BBEC',
  },
  titleText: {
   fontSize: 15,
    color: 'grey',
  },
});

export default SearchResult;
