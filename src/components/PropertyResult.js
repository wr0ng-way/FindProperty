import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

type Props = {};
class PropertyResult extends Component<Props> {
  static navigationOptions = {
    title: 'Property'
  }

  //  roomDetails = () => {
  //   `${property.bedroom_number} bed house ${property.bathroom_number} bathrooms`
  //  }

  render() {
    const { params } = this.props.navigation.state
    console.log(params.property)
    const roomDetails = `${params.property.bedroom_number} bed house ${params.property.bathroom_number} bathrooms`
    return(
       <View style={styles.viewContainer}>
         <Image source={{uri: params.property.img_url}} style={styles.img} />
         <View style={styles.detailContainer}>
           <Text style={styles.priceText}>{params.property.price_formatted}</Text>
           <Text style={styles.titleText}>{params.property.title}</Text>
           <Text style={styles.detailText}>{roomDetails}</Text>
           <Text style={styles.detailText}>{params.property.summary}</Text>
         </View>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  img: {
    flex: 1.5,
    width: '100%',
  },
  detailContainer: {
    flex: 1,
    marginTop: 10,
  },
  priceText: {
    fontSize: 27,
    color: '#48BBEC',
    marginTop: 10,
  },
  titleText: {
    fontSize: 23,
    color: 'grey',
    marginTop: 10,
  },
  detailText: {
    fontSize: 18,
    color: 'grey',
    marginTop: 10,
  },
});

export default PropertyResult;
