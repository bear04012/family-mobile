import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image,ImageBackground } from 'react-native';
import { Constants } from "expo";
import colors from './components/Colors';
import HomeScreen from './containers/HomeScreen';
import Talk from './containers/Talk';
import CalendarApp from './containers/Calendar';
import Galleries from './containers/Galleries';
import Setting from './containers/Setting';
import Goal from './containers/Goal'
import { db } from './utils/db';

import {createDrawerNavigator,DrawerItems} from 'react-navigation';
import { Icon, Button, Container, Content, Header,Body, Left } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"hello",
    }
  }
  render() {

    return (
      <View style={styles.wrapper}>
        <MyApp />
      </View>
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height:80}}>
      <Body>
        <Image
          style={styles.drawerImage}
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props}/>
    </Content>
  </Container>
)

const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Talk: {
    screen: Talk,
  },
  Gallery: {
    screen: Galleries,
  },
  ToDo: {
    screen: CalendarApp,
  },
  Goal: {
    screen:Goal,
  },
  Setting: {
    screen:Setting,
  },

}, {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'createDrawerNavigator',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
  })

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius:75
  }
});
