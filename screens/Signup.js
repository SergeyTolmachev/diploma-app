import React from 'react';
import {Alert, AsyncStorage, View} from 'react-native';
import {Content, Button, Text, Form, Input, Item, H3 } from 'native-base';
import axios from "axios/index";

export default class SignInForm extends React.Component {

  state = {
    login: '',
    name: '',
    password: '',
    email: '',
    invite: '',
    isActive: false,
  }

  handleChangeInput = element => event => {
    this.setState({...this.state, [element]: event["nativeEvent"].text}, () => {
      if (this.state.login.length > 3 && this.state.name.length > 3
        && this.state.password.length > 3 && this.state.email.length > 3) {
        this.setState({ ...this.state, isActive: true });
      }
    });
  }

  handleSignUp = event => {
    axios({
      method: 'POST',
      url: 'http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/user/registration',
      data: {
        login: this.state.login,
        password: this.state.password,
        name: this.state.name,
        email: this.state.email,
        invite: this.state.invite,
      },
    }).then(({data}) => {
      AsyncStorage.multiSet([['token', data.token], ['type', String(data.type)]])
    }).then(() => {
      this.setState({...this.state, password: '', login: '', name: '', invite: '', isActive: '', email: ''}, () => {
        Alert.alert('Поздравляю',
          'Регистрация прошло успешно!',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      });
    })
      .catch((error) => {
        let message = 'Проверьте корректность заполнения формы';
        if (error.response && error.response.data && error.response.data['_error']){
          message = error.response.data['_error'];
        }
        this.setState({...this.state, password: ''},
          () => Alert.alert('Ошибка регистрации',
            message,
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          ))});
  }

  render() {
    const { login, name, password, email, invite, isActive } = this.state;
    return (
      <Content style={{padding: 7}}>
        <H3 style={{alignSelf: 'center'}}>Регистрация</H3>
        <Text>
          Для прохождения регистрации, пожалуйста, заполните форму ниже
        </Text>
        <Form>
          <Item regular last>
            <Input placeholder="Логин" value={login} onChange={this.handleChangeInput('login')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Имя" value={name} onChange={this.handleChangeInput('name')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Ваш пароль"
                   value={password}
                   onChange={this.handleChangeInput('password')}
                   secureTextEntry
            />
          </Item>
          <Item regular last>
            <Input placeholder="email" value={email} onChange={this.handleChangeInput('email')}/>
          </Item>
          <Item regular last>
            <Input placeholder="инвайт" value={invite} onChange={this.handleChangeInput('invite')}/>
          </Item>
          <Button disabled={!isActive} style={{alignSelf: 'center', marginTop: 5}} onPress={this.handleSignUp}>
            <Text>
              Регистрация
            </Text>
          </Button>
        </Form>
      </Content>
    )
  }
}
