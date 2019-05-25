import React from 'react';

import {Card, CardItem, Container, Header, Content, Button, Icon, Text,  H1, H3, Footer, FooterTab } from 'native-base';

export default class Home extends React.Component {

  static navigationOptions = {
    title: 'Главная',
  }

  render() {
    return (
          <Card>
            <CardItem header>
              <H3>Добро пожаловать!</H3>
            </CardItem>
            <CardItem>
              <Text>Для удобной навигации Вы можете использовать навигацию внизу экрана</Text>
            </CardItem>
            <CardItem>
              <Text>Для авторизации нажмите на </Text><Button info onPress={() => this.props.navigation.navigate('Signin')}><Text>Sign In</Text></Button>
            </CardItem>
            <CardItem>
              <Text>Для регистрации нажмите на </Text><Button info onPress={() => this.props.navigation.navigate('Signup')}><Text>Sign Up</Text></Button>
            </CardItem>
            <CardItem>
              <Text>Для оформления заказа нажмите на </Text>
              <Button info onPress={() => this.props.navigation.navigate('MakeOrder')}><Text>Make an order</Text></Button>
            </CardItem>
          </Card>
    );
  }
}
