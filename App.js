import React from "react";
import {AppLoading, Font} from 'expo';
import { createBottomTabNavigator, createAppContainer} from "react-navigation";

import {
  Container,
} from 'native-base';

import Home from './screens/Home';
import Settings from './screens/Settings';
import Makeanorder from './screens/MakeOrder';

const AppNavigator = createBottomTabNavigator({
  MakeOrder: {
    screen: Makeanorder,
  },
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
}, {
  resetOnBlur: true,
  initialRouteName: "MakeOrder",
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
