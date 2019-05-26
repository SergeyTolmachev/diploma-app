import React from 'react';
import axios from 'axios';
import {Alert, AsyncStorage, View} from 'react-native';
import {
  Header,
  Form,
  Picker,
  Container,
  Content,
  Icon,
  Text,
  H3,
  Item,
  Input,
  ListItem,
  CheckBox,
  Button,
} from 'native-base';


class OrderForm extends React.Component {
  state = {
    activeOrder: false,
    isActive: false,
    size: "1",
    thickness: "1",
    address: '',
    phone: '',
    email: '',
    name: '',
    meat: {
      pepperoni: false,
      chicken: false,
      becon: false,
      farsh: false,
      sosiski: false,
      anchous: false,
      bekon: false,
    },
    green: {
      onion: false,
      mushroom: false,
      tomato: false,
      pineapple: false,
      pepper: false,
      halapenio: false,
      golives: false,
      bolives: false,
      chilli: false,
    },
  }

  handlePicker = picker => value => {
    this.setState({...this.state, [picker]: value})
  }

  handleCheckBox = (type, value) => event => {
    this.setState({
      ...this.state, [type]: {
        ...this.state[type],
        [value]: !this.state[type][value]
      }
    });
  }

  handleChangeInput = element => event => {
    this.setState({...this.state, [element]: event["nativeEvent"].text}, () => {
      if (this.state.address.length > 3 && this.state.phone.length > 3) {
        this.setState({...this.state, isActive: true});
      }
    });
  }

  handleMakeOrder = async () => {
    try {
      const result = await axios({
        method: 'post',
        url: 'http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/order/',
        data: {
          size: this.state.size,
          thickness: this.state.thickness,
          address: this.state.address,
          phone: this.state.phone,
          email: this.state.email,
          name: this.state.name,
          meat: this.state.meat,
          green: this.state.green,
        },
      });

      await AsyncStorage.setValue('order', result.data.hash);

      this.props.checkOrder(result.data.hash);

    } catch (error) {
      let message = 'Ошибка при заказе';
      console.log(error.response.data);
      if (error.response && error.response.data && error.response.data['_error']) {
        message = error.response.data['_error'];
      }
      Alert.alert('Заказ',
        message,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      )
    }
  }

  render() {
    const {meat, green, isActive, name, address, email, phone} = this.state;
    return (
      <Content style={{padding: 7}}>
        <H3 style={{alignSelf: 'center'}}>Оформить заказ</H3>
        <Form>
          <Text>Выберите интересующие Вас ингредиенты, чтобы оформить ваш заказ</Text>
          <Item picker>
            <Text>Размер</Text>
            <Picker
              mode="dropdown"
              note
              style={{width: undefined}}
              placeholder="Размер"
              placeholderStyle={{color: "#bfc6ea"}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.size}
              onValueChange={this.handlePicker('size')}
            >
              <Picker.Item label="Маленький" value="1"/>
              <Picker.Item label="Средний" value="2"/>
              <Picker.Item label="Большой" value="3"/>
            </Picker>
          </Item>
          <Item picker>
            <Text>Толщина</Text>
            <Picker
              mode="dropdown"
              note
              style={{width: undefined}}
              placeholder="Размер"
              placeholderStyle={{color: "#bfc6ea"}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.thickness}
              onValueChange={this.handlePicker('thickness')}
            >
              <Picker.Item label="Обычная" value="1"/>
              <Picker.Item label="Тонкая" value="2"/>
              <Picker.Item label="Толстая" value="3"/>
              <Picker.Item label="Очень толстая" value="4"/>
            </Picker>
          </Item>
          <View>
            <Text style={{alignSelf: 'center', marginTop: 5, marginBottom: 5}}>Добавьте мясо к
              вашей пицце:</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Button style={{margin: 2}} bordered={!meat.pepperoni}
                      onPress={this.handleCheckBox('meat', 'pepperoni')}>
                <Text>Пепперони</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!meat.chicken}
                      onPress={this.handleCheckBox('meat', 'chicken')}>
                <Text>Курица</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!meat.becon}
                      onPress={this.handleCheckBox('meat', 'becon')}>
                <Text>Ветчина</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!meat.sosiski}
                      onPress={this.handleCheckBox('meat', 'sosiski')}>
                <Text>Сосиски</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!meat.anchous}
                      onPress={this.handleCheckBox('meat', 'anchous')}>
                <Text>Анчоусы</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!meat.bekon}
                      onPress={this.handleCheckBox('meat', 'bekon')}>
                <Text>Бекон</Text>
              </Button>
            </View>
          </View>
          <View>
            <Text style={{alignSelf: 'center', marginTop: 5, marginBottom: 5}}>Добавьте овощей и
              фруктов к вашей пицце:</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Button style={{margin: 2}} bordered={!green.onion}
                      onPress={this.handleCheckBox('green', 'onion')}>
                <Text>Лук</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.mushroom}
                      onPress={this.handleCheckBox('green', 'mushroom')}>
                <Text>Грибы</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.tomato}
                      onPress={this.handleCheckBox('green', 'tomato')}>
                <Text>Помидоры</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.pineapple}
                      onPress={this.handleCheckBox('green', 'pineapple')}>
                <Text>Ананас</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.pepper}
                      onPress={this.handleCheckBox('green', 'pepper')}>
                <Text>Болгарский перец</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.halapenio}
                      onPress={this.handleCheckBox('green', 'halapenio')}>
                <Text>Халапеньо</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.golives}
                      onPress={this.handleCheckBox('green', 'golives')}>
                <Text>Зеленые оливки</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.bolives}
                      onPress={this.handleCheckBox('green', 'bolives')}>
                <Text>Черные оливки</Text>
              </Button>
              <Button style={{margin: 2}} bordered={!green.chilli}
                      onPress={this.handleCheckBox('green', 'chilli')}>
                <Text>Перец чили</Text>
              </Button>
            </View>
          </View>
          <Item regular last>
            <Input placeholder="Адрес" value={address}
                   onChange={this.handleChangeInput('address')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Имя" value={name} onChange={this.handleChangeInput('name')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Email" value={email} onChange={this.handleChangeInput('email')}/>
          </Item>
          <Item regular last>
            <Input placeholder="Phone" value={phone} onChange={this.handleChangeInput('phone')}/>
          </Item>
          <Button disabled={!isActive}
                  style={{alignSelf: 'center', marginTop: 5, marginBottom: 15}}
                  onPress={this.handleMakeOrder}>
            <Text>
              Заказать
            </Text>
          </Button>
        </Form>
      </Content>
      )
  }
}

export default class MakeOrder extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Заказать',
    tabBarIcon: ({tintColor}) => (
      <Icon type="AntDesign" name='shoppingcart' style={{color: tintColor}}/>),
  }

  state = {
    activeOrder: false,
  }

  checkOrder = async (hash) => {
    try {
      const result = await axios({
        method: 'post',
        url: 'http://ec2-18-222-201-220.us-east-2.compute.amazonaws.com/api/order/',
        data: {
          hash,
        },
      });
      if (result) {
        this.setState({ ...this.state, activeOrder: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = () => {
    this.checkOrder();
  }

  render() {

  const { activeOrder } = this.state;
    return (
      <Container>
        <Header>
        </Header>
        {
          !activeOrder && <OrderForm checkOrder={this.checkOrder}/>
        }
        {
          activeOrder && <Text>У Вас есть активный заказ</Text>
        }
      </Container>
    );
  }
}
