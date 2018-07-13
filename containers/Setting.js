import React, { Component } from 'react';
import { firebase, db } from '../utils/db';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Content, Header, Left } from 'native-base';
import Families from "./setting/Families";
import DeleteWarning from '../components/DeleteWarning';

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      familyID: undefined,
      name: "",
      families: [],
      warning: false,
      text:"Will You Leave the Group?"
    }
    this.unscub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let obj = { user };

        db.collection("users").doc(user.uid).get().then(snapshot => {
          if ("familyID" in snapshot.data()) {
            obj.familyID = snapshot.data().familyID;
            
            db.collection("users").where("familyID", "==", snapshot.data().familyID).get()
              .then((querySnapshot) => {
                let ary = [];
                querySnapshot.forEach((val) => ary.push(val.data()));
                this.setState({ families: ary });
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
    this.openWarning = this.openWarning.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
    this.tryLeaveGroup = this.tryLeaveGroup.bind(this);
  }

  openWarning() {
    this.setState({warning:true})
  }
  closeWarning() {
    this.setState({ warning: false})
  }
  tryLeaveGroup() {
    db.collection("familyList").doc(this.state.familyID).get().then(snapshot => {
      let oldAry = snapshot.data().users;
      let newAry = [];
      oldAry.forEach((val) => {
        if (val != this.state.user.uid) {
          newAry.push(val);
        }
      })
      db.collection("familyList").doc(this.state.familyID).set({ users: newAry });
    })

    
    db.collection("users").doc(this.state.user.uid).get().then(snapshot => {
      let obj = {
        email: snapshot.data().email,
        firstName: snapshot.data().firstName,
        lastName: snapshot.data().lastName,
      };
      db.collection("users").doc(this.state.user.uid).set(obj);
      this.setState({familyID:undefined})
    })
    
  }


  render() {
    const { user, familyID,families,warning } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />

          </Left>
          {familyID ? <Text style={styles.header}>{`${familyID}'s Family Info`}</Text> : <Text style={styles.header}>Family has not founded</Text>}
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          
          <Families key={this.state.familyID} familyID={this.state.familyID} user={user} families={this.state.families} name={this.state.name} openWarning={this.openWarning}/>
          {warning && <DeleteWarning text={this.state.text} delete={this.tryLeaveGroup} close={this.closeWarning} />}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    top: 10,
  }

})

export default Setting;