import React from "react";
import {AppLoading, Font} from 'expo';
import { createBottomTabNavigator, createAppContainer} from "react-navigation";
import {FluidNavigator} from "react-navigation-fluid-transitions"

import {
  Card,
  CardItem,
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  H1,
  H3,
  Footer,
  FooterTab,
  Spinner
} from 'native-base';


import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Makeanorder from './screens/MakeOrder';

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Signin: {
    screen: Signin,
  },
  Signup: {
    screen: Signup,
  },
  MakeOrder: {
    screen: Makeanorder,
  },
}, {
  initialRouteName: "Home",
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    style: {
      height: 30,
    },
  },

});

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  state = {
    activeButton: "1",
    loading: true,
  };

  componentDidMount() {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => {
      this.setState({...this.state, loading: false})
    })
      .catch(error => console.log(error));
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return (
        <Container style={{margin: 'auto'}}>
          <AppLoading/>
        </Container>
      )
    }
    return (
      <AppContainer/>
    );
  }
}

export default App;
