import React, { Component } from 'react';
import { firebase, db } from '../utils/db';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, CameraRoll } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import OpenGoal from './goal/OpenGoal';
import { Icon, Button, Container, Content, Header, Left, Accordion  } from 'native-base';

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      familyID: undefined,
      name: "",
      photos: "",
      openGoal: false,
      goals:[],
    }
    this.unscub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let obj = { user };

        db.collection("users").doc(user.uid).get().then(snapshot => {
          if (snapshot.data().familyID) {
            obj.familyID = snapshot.data().familyID;
            let docRef = db.collection("goal").doc(obj.familyID);
            docRef.get().then((doc) => {
              let goals = [];
              doc.data().goals.forEach((val) => goals.push(val));
              this.setState({ goals });
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

    this.tryOpenGoal = this.tryOpenGoal.bind(this);
    this.tryCloseGoal = this.tryCloseGoal.bind(this);
    this.tryCreateGoal = this.tryCreateGoal.bind(this);
  }

  tryOpenGoal() {
    this.setState({openGoal:true})
  }

  tryCloseGoal() {
    this.setState({openGoal:false})
  }

  tryCreateGoal(obj) {
    let docRef = db.collection("goal").doc(obj.familyID);

    docRef.get().then((doc) => {
      if (doc.exists) {
        let containsAll = {};
        let goals = [];
        let user = {};
        this.state.goals.forEach((val) => goals.push(val));
        user.date = obj.date;
        user.goal = obj.goal;
        user.name = obj.name;
        goals.push(user);
        containsAll.goals = goals;
        db.collection("goal").doc(obj.familyID).update(containsAll)
          .then(() => {
            console.log("Document successfully updated!");
            this.setState({ goals: containsAll.goals })
          });
      } else {
        let containsAll = {};
        let goals = [];
        let user = {};
        user.date = obj.date;
        user.goal = obj.goal;
        user.name = obj.name;
        goals.push(user);
        containsAll.goals = goals;
        docRef.set(containsAll)
          .then(() => {
            console.log("Document successfully written!");
            this.setState({ goals })
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }


  render() {

    const { familyID, openGoal, goals } = this.state;
    
    let goalLists = goals.map((val, i) => {

      let obj = {};
      obj.title = val.name;
      obj.content = `goal: ${val.goal}`;

      return obj;

      // <TouchableOpacity key={i} style={styles.goalList}>
      //   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      //     <Text style={{ color: '#59EEB2' }}>{`${val.name}'s goal`}</Text>
      //     <Text style={{ color: 'red' }}>{`${val.date} days left`}</Text>
      //   </View>
      //   <Text style={{ color: '#FCA9A8' }}>{`goal: ${val.goal}`}</Text>
      // </TouchableOpacity>
    })
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>

          {familyID ? <Text style={styles.header}>{`${familyID}'s goal`}</Text> : <Text style={styles.header}>Family has not founded</Text>}
        </Header>
        <Content contentContainerStyle={{ flex: 1, }}>
          {openGoal && <OpenGoal key={familyID} closeGoal={this.tryCloseGoal} familyID={this.state.familyID} name={this.state.name} tryCreateGoal={this.tryCreateGoal} />}
          <TouchableOpacity onPress={this.tryOpenGoal} style={styles.box}>
            <Entypo style={{ fontSize: 30 }} name="plus" />
            <Text style={{color:'skyblue',paddingLeft:20,fontSize:20,}}> Add a Goal</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}><Text style={{fontSize:20,fontStyle:'bold'}}> Family Goal </Text></View>
          <Accordion
            dataArray={goalLists}
            headerStyle={{ backgroundColor: "#b7daf8" }}
            contentStyle={{ backgroundColor: "#ddecf8" }}
          />
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
  },
  box: {
    backgroundColor: '#e6e6e6',
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  goalList: {
    backgroundColor: '#E5ECF5',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
  }
})

export default Goal;