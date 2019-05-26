import React from "react";
import {View} from 'react-native';

import {
  List,
  Text,
} from 'native-base';

import ReviewItem from './ReviewItem';

export default class Reviews extends React.Component {
  render() {
    const {reviews} = this.props;

    return (
      <View>
        {
          (!reviews || !reviews.length) && <Text>Отсутствуют отзывы</Text>
        }
        <List>
          {
            !!reviews && reviews.length > 0 && reviews.map((review) => (
              <ReviewItem key={review.id} review={review}/>))
          }
        </List>
      </View>
    )
  }
}
