import React from 'react';
import { Alert, View } from 'react-native';
import axios from 'axios';

import {
  Button,
  Container,
  Content,
  Header,
  Item,
  Input,
  Form,
  H3,
  Text,
} from 'native-base';

import {AsyncStorage} from 'react-native';

class SignInForm extends React.Component {
  render() {
    const {handleChangeInput, handleSignIn, isActive, login, password} = this.props;

    return (
      <View>
        <Text>
          Для авторизации, пожалуйста, введите данные указанные Вами при регистрации
        </Text>
        <Form>
          <Item regular last>
            <Input placeholder="Ваш логин" value={login} onChange={handleChangeInput('login')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Ваш пароль"
                   value={password}
                   onChange={handleChangeInput('password')}
                   secureTextEntry
            />
          </Item>
          <Button disabled={!isActive} style={{alignSelf: 'center', marginTop: 5}} onPress={handleSignIn}>
            <Text>
              Авторизоваться
            </Text>
          </Button>
        </Form>
      </View>
    )
  }
}

class Authorized extends React.Component {
  render() {
    const { handleExit } = this.props;
    return (
      <View>
        <Text>
          Вы успешно авторизованы и можете использовать все возможности приложения для вашего типа
          пользователя
        </Text>
        <Button style={{alignSelf: 'center', marginTop: 5}} onPress={handleExit}>
          <Text>
            Выйти
          </Text>
        </Button>
      </View>
    )
  }
}

export default class Signin extends React.Component {
  state = {
    isAuth: false,
    login: '',
    password: '',
  }

  checkAuth = () => {
    AsyncStorage.multiGet(['token', 'type'])
      .then((items) => {
        if (items[0][1]) {
          this.setState({...this.state, isAuth: true })
        } else {
          this.setState({...this.state, isAuth: false })
        }
        if (items[1][1]){
          this.setState({ ...this.state, type: items[1][1]})
        }
      })
      .catch((error) => console.log(error))
  }

  componentDidMount = () => {
    this.checkAuth();
  }

  handleChangeInput = element => event => {
    this.setState({...this.state, [element]: event["nativeEvent"].text});
  }

  handleExit = () => {
    AsyncStorage.multiRemove(['token', 'type'])
      .then(() => {
        this.checkAuth()
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Ошибка при попытке выхода',
        'Повторите попытку позже',
        [
          {text: 'OK'},
        ],
        {cancelable: false},)})
  }

  handleSignIn = (event) => {
    axios({
      method: 'POST',
      url: 'http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/user/auth',
      data: {
        login: this.state.login,
        password: this.state.password,
      },
    }).then(({data}) => {
        AsyncStorage.multiSet([['token', data.token], ['type', String(data.type)]])
    }).then(() => {
      this.setState({...this.state, password: '', login: ''});
      this.checkAuth();
    })
      .catch((error) => {
        this.setState({...this.state, password: ''},
          () => Alert.alert('Ошибка авторизации',
          'Логин или пароль являются неверными',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        ))});
  }

  render() {
    const {isAuth, login, password} = this.state;
    return (
        <Content style={{padding: 7}}>
          <H3 style={{alignSelf: 'center'}}>Авторизация</H3>

          {
            !isAuth &&
            <SignInForm isActive={login.length >= 3 && password.length >= 3}
                        handleChangeInput={this.handleChangeInput}
                        handleSignIn={this.handleSignIn}
                        login={login}
                        password={password}
            />
          }
          {
            isAuth && <Authorized handleExit={this.handleExit}/>
          }
        </Content>
    );
  }
}
