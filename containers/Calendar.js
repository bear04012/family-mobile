import React, { Component } from 'react';
import { firebase, db } from '../utils/db';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Entypo } from "@expo/vector-icons";
import AddAgenda from './ToDo/AddAgenda';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class CalendarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      familyID: undefined,
      name: "",
      items: {},
      timeStamp: -1,
      agenda: false,
      day:"",
    }
    this.unscub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let obj = { user };

        db.collection("users").doc(user.uid).get().then(snapshot => {
          if ("familyID" in snapshot.data()) {
            obj.familyID = snapshot.data().familyID;
            db.collection("ToDo").doc(snapshot.data().familyID).get()
              .then((doc) => {
                this.setState({
                  items: doc.data().day
                })
              })
           
          }
          obj.name = snapshot.data().firstName;
          this.setState(obj);
        })

      } else {
        this.setState({
          user: undefined
        })
      }
    });

    this.addAgenda = this.addAgenda.bind(this);
    this.closeAgenda = this.closeAgenda.bind(this);
    this.timeToString = this.timeToString.bind(this);
    this.tryCreateAgenda = this.tryCreateAgenda.bind(this);

    
  }

  componentWillUnmount() {
    this.unscub();
  }

  addAgenda(day) {
    this.setState({agenda:true,day})
  }
  closeAgenda() {
    this.setState({agenda:false})
  }
  tryCreateAgenda(obj) {


    let docRef = db.collection("ToDo").doc(obj.familyID);

    docRef.get().then((doc) => {
      if (doc.exists) {
        let containsAll = {};
        let dateObj = doc.data().day;
        let agenda = [];
        let text = {};
        text.text = obj.addAgenda;
        agenda.push(text);
        dateObj[obj.day] = agenda;
        containsAll["day"] = dateObj;
        db.collection("ToDo").doc(obj.familyID).update(containsAll)
          .then(() => {
            console.log("Document successfully updated!");
            this.setState({ items: containsAll.day })
          });
      } else {
        let containsAll = {};
        let dateObj = {};
        let agenda = [];
        let text = {};
        text.text = obj.addAgenda;
        agenda.push(text);
        dateObj[obj.day] = agenda;
        containsAll["day"] = dateObj;
        docRef.set(containsAll)
          .then(() => {
            console.log("Document successfully written!");
            this.setState({ items: containsAll.day })
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      } 
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  
  render() {
    const { user, familyID,agenda } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
            
          </Left>
          {familyID ? <Text style={styles.header}>{familyID}</Text> : <Text style={styles.header}>Family has not founded</Text>}
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          
          {agenda && <AddAgenda day={this.state.day}
            familyID={this.state.familyID}
            user={this.state.user}
            closeAgenda={this.closeAgenda}
            timeToString={this.timeToString}
            tryCreateAgenda={this.tryCreateAgenda}
          />}

          {user && <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          /> }
          
        </Content>
      </Container>
    );
  }

  loadItems(day) {
    // console.log(day.timestamp + 2 * 24 * 60 * 1000);
    // console.log(this.timeToString(day.timestamp + 2 * 24 * 60 * 1000));
    
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          let random = Math.floor(Math.random() * 2);
          const numItems = random > 0 ? 1 : 0;
          for (let j = 0; j < numItems; j++) {

          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, ]}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate(day) {
    return (
      <View style={styles.emptyDate}><Entypo name="plus" color="skyblue" size={20} onPress={() => this.addAgenda(day)} /></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    top: 10,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    justifyContent:"center",
    height: 15,
    flex: 1,
    paddingTop: 30,
    alignItems:"center",
  }

})


export default CalendarApp; 