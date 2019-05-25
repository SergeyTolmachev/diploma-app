import React from 'react';

import {Card, CardItem, Container, Header, Content, Button, Icon, Text,  H1, H3, Footer, FooterTab } from 'native-base';

export default class Signup extends React.Component {

  static navigationOptions = {
    title: 'Регистрация',
  }

  render() {
    return (
        <Content>
          <Card>
            <CardItem header>
              <H3>Регистрация</H3>
            </CardItem>
          </Card>
        </Content>
    );
  }
}
