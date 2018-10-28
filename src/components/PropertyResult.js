import React, { Component } from 'react';
import {
  View,
  Text,
  Image
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
    return(
      <View>
        <Image source={{uri: params.property.img_url}} />
        <Text>{params.property.price_formatted}</Text>
        <Text>{params.property.title}</Text>
        <Text>`{params.property.bedroom_number} bed house {params.property.bathroom_number} bathrooms`</Text>
        <Text>{params.property.summary}</Text>
      </View>
    )
  }
}

export default PropertyResult;
