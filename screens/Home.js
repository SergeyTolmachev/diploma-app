import React from 'react';
import axios from "axios";

import {
  Container,
  Header,
  Icon,
  Content,
  Text,
  H3,
} from 'native-base';

import Review from './Review';
import Reviews from './Reviews';

export default class Home extends React.Component {

  state = {
    reviews: [],
  }

  static navigationOptions = {
    tabBarLabel: 'Главная',
    tabBarIcon: ({tintColor}) => (<Icon type="AntDesign" name='home' style={{color: tintColor}}/>),
  }

  componentDidMount = () => {
    this.getReviews();
  }

  getReviews = () => {
    axios.get('http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/review/list')
      .then((reviews) => {
        this.setState({reviews: reviews.data});
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Container>
        <Header>
        </Header>
        <Content style={{padding: 7}}>
          <H3 style={{alignSelf: 'center'}}>Добро пожаловать!</H3>
          <Text>Для удобной навигации Вы можете использовать навигацию внизу экрана</Text>
          <Reviews reviews={this.state.reviews}/>
          <Review getReviews={this.getReviews}/>
        </Content>
      </Container>
    );
  }
}
