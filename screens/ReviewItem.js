import React from "react";
import {DateTime} from "luxon";

import {Image, View} from 'react-native';

import {
  ListItem, Left, Body, Right, Thumbnail, Text, Icon
} from 'native-base';


export default class ReviewItem extends React.Component {
  render() {
    const {review} = this.props;
    const date = DateTime.fromISO(review.createdAt).toFormat('D T');

    let marks = [];

    for (let i = 1; i <= 5; i = i + 1) {
      if (i <= review.mark) {
        marks.push(<Icon type="AntDesign" name='star' style={{fontSize: 22, color: '#f57c00'}} key={i}/>)
      } else {
        marks.push(<Icon type="AntDesign" name='star' style={{fontSize: 22}} key={i}/>)
      }
    }

    return (
      <ListItem avatar>
        <Left>
          <Image
            style={{ width: 40, height: 40}}
            source={require('./avatar.jpg')}
          />
        </Left>
        <Body>
        <Text>{review.createdBy}</Text>
        <Text note>{review.text}</Text>
        </Body>
        <Right>
          <Text note>{date}</Text>
          <View style={{flexDirection: 'row'}}>
            {marks}
          </View>
        </Right>
      </ListItem>
    )
  }
}
