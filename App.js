import React from "react";
import {View} from "react-native";
import {AppLoading, Font} from 'expo';
import { createBottomTabNavigator, createAppContainer} from "react-navigation";

import {
  Container,
} from 'native-base';

import Home from './screens/Home';
import Settings from './screens/Settings';
import Signin from './screens/Settings';
import Makeanorder from './screens/MakeOrder';
import Reviews from './screens/Reviews';

import axios from "axios/index";

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  MakeOrder: {
    screen: Makeanorder,
  },
}, {
  initialRouteName: "Home",
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
    },
    style: {
      height: 60,
    },
  },

});

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  state = {
    activeButton: "1",
    loading: true,
    reviews: [],
  };

  componentDidMount = () => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => {
      this.setState({...this.state, loading: false});
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
