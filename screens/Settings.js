import React from 'react';
import {Alert, View} from 'react-native';
import {Text, Button, Icon, Footer, FooterTab, Container, Header, Content} from 'native-base';
import axios from 'axios';

import Signin from './Signin';
import Signup from './Signup';

export default class Settings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Настройки',
    tabBarIcon: ({tintColor}) => (
      <Icon type="AntDesign" name='setting' style={{color: tintColor}}/>),
  }

  state = {
    active: 'signin',
  }

  handlePressButton = (button) => (event) => {
    this.setState({ ...this.state, active: button });
  }

  render() {
    const {active} = this.state;
    return (
      <Container>
        <Header>
        </Header>
        {
          active === 'signin' && <Signin/>
        }
        {
          active === 'signup' && <Signup handlePressButton={this.handlePressButton}/>
        }
        <Footer>
          <FooterTab>
            <Button active={active === 'signin'} onPress={this.handlePressButton("signin")}>
              <Text>Авторизация</Text>
            </Button>
            <Button active={active === 'signup'} onPress={this.handlePressButton("signup")}>
              <Text>Регистрация</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}



