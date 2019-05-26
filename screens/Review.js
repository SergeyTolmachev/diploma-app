import React from "react";
import axios from "axios";
import {Alert, AsyncStorage, View} from 'react-native';

import {
  Button, Input, Item, Icon, Text, Form, Textarea
} from 'native-base';


export default class Review extends React.Component {

  state = {
    text: '',
    mark: 3,
    isActive: false,
  }

  componentDidMount = () => {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          this.setState({...this.state, isActive: true});
        }
      })
  }

  handleSendReview = async () => {
    const token = await AsyncStorage.getItem('token');
    let result;
    try {
      result = await axios({
        method: 'post',
        url: 'http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/review/',
        data: {
          text: this.state.text,
          mark: this.state.mark,
        },
        headers: {
          token,
        },
      })
      this.props.getReviews();
      this.setState({ ...this.state, text:'', mark: 3});
      Alert.alert('Отзыв',
        'Спасибо за ваш отзыв!',
        [
          {text: 'OK'},
        ],
        {cancelable: false})
    } catch (error) {
      let message = 'Ошибка при отправке отзыва';
      if (error.response && error.response.data && error.response.data['_error']) {
        message = error.response.data['_error'];
      }
      Alert.alert('Отзыв',
        message,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      )
    }
  }

  handleChangeInput = element => event => {
    this.setState({...this.state, [element]: event["nativeEvent"].text});
  }

  handleOnClick = mark => event => {
    this.setState({...this.state, mark});
  };

  render() {
    const {text, mark, isActive} = this.state;

    let marks = [];

    for (let i = 1; i <= 5; i = i + 1) {
      if (i <= mark) {
        marks.push(<Icon type="AntDesign" name='star' style={{fontSize: 30, color: '#f57c00'}}
                         key={i} onPress={this.handleOnClick(i)}/>)
      } else {
        marks.push(<Icon type="AntDesign" name='star' style={{fontSize: 30}} key={i}
                         onPress={this.handleOnClick(i)}/>)
      }
    }

    return (
      <Form style={{padding: 7}}>
        <Text>Оставить отзыв</Text>
        <Textarea style={{width: '100%'}} rowSpan={3} value={text} bordered placeholder="Ваш отзыв"
                  onChange={this.handleChangeInput('text')}/>
        <View style={{flexDirection: 'row'}}>
          {marks}
        </View>
        <Button disabled={!isActive} style={{alignSelf: 'center', marginTop: 5}}
                onPress={this.handleSendReview}>
          <Text>
            Отправить
          </Text>
        </Button>
      </Form>
    )
  }
}
