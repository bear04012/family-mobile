import React, { Component } from 'react';
import { Constants } from "expo";
import { firebase,db } from '../utils/db';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';
import Message from './chat/Message';

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:undefined,
      chat: "",
      familyID: undefined,
      name: "",
      texts:[],
    }
    this.unscub  = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let obj = { user };

        db.collection("users").doc(user.uid).get().then(snapshot => {
          if ("familyID" in snapshot.data()) {
            obj.familyID = snapshot.data().familyID;

            db.collection("chat").where("familyID", "==", snapshot.data().familyID).get()
              .then((querySnapshot) => {
                let texts = [];
                querySnapshot.forEach((val) => texts.push(val.data()))
                texts.sort((a, b) => (a.time.seconds - b.time.seconds))
                this.setState({ texts });
              }).catch(function (error) {
                console.log("Error getting documents: ", error);
              });

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
    
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillUnmount() {
    this.unscub();
  }

  sendMessage(obj) {
    let text = {
      name: obj.name,
      text: obj.text,
      familyID: obj.familyID,
      time: firebase.firestore.FieldValue.serverTimestamp()
    }
    db.collection("chat").add(text)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState(prevState => ({ texts: [...prevState.texts, text] }));
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { user, familyID, texts } = this.state;
    
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          {familyID ? <Text style={styles.header}>{`${familyID}'s Family Chat`}</Text> : <Text style={styles.header}>Family has not founded</Text>}
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
          
          <Message texts={texts} name={this.state.name} key={this.state.familyID} familyID={this.state.familyID} sendMessage={this.sendMessage} />
         
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    top: 10,
  }

})

export default Talk; 