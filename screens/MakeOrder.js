import React from 'react';

import {Card, CardItem, Container, Header, Content, Button, Icon, Text,  H1, H3, Footer, FooterTab } from 'native-base';

export default class MakeOrder extends React.Component {

  static navigationOptions = {
    title: 'Заказать',
  }

  render() {
    return (
        <Content>
          <Card>
            <CardItem header>
              <H3>Оформить заказ</H3>
            </CardItem>
          </Card>
        </Content>
    );
  }
}
