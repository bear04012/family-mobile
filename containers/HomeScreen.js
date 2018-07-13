import React, { Component } from 'react';
import { firebase, db } from '../utils/db';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity,ActivityIndicator } from 'react-native';
import Login from './auth/Login';
import Register from './auth/Register';
import Online from './auth/Online';
import Offline from './auth/Offline';
import AddFamily from './family/AddFamily';
import JoinFamily from './family/JoinFamily';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      status: "",
      familyID: undefined,
      name: "",
      isLoading:false,
    }

    this.unscub = firebase.auth().onAuthStateChanged((user) => {
      this.setState({isLoading:true})
      if (user) {
        let obj = { user };
        
        db.collection("users").doc(user.uid).get().then(snapshot => {
          if ("familyID" in snapshot.data()) {
            obj.familyID = snapshot.data().familyID;
          }
          obj.name = snapshot.data().firstName;
          this.setState(obj);
          this.setState({ isLoading: false})
        })

      } else {
        this.setState({
          user: undefined,
          isLoading:false,
        })
      }
    });

    
    this.statusChange = this.statusChange.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
    this.trySignOut = this.trySignOut.bind(this);
    this.trySignUp = this.trySignUp.bind(this);
    this.tryCreateFamily = this.tryCreateFamily.bind(this);
    this.tryJoinFamily = this.tryJoinFamily.bind(this);
    this.tryUpdateUser = this.tryUpdateUser.bind(this);
  }
  componentWillUnmount() {
    this.unscub();
  }
  // static navigationOptions = {
  //   drawerIcon: (
  //     <Image source={require('./assets/DrawerIcons/home.png')}
  //       style={{height:24,width:24}}/>
  //   )
  // }

  tryCreateFamily(obj) {

    let docRef = db.collection("familyList").doc(obj.familyID);

    docRef.get().then((doc) => {
      if (doc.exists) {
        alert("This Family ID already exists!");
      } else {
        // doc.data() will be undefined in this case
        let users = [];
        users.push(obj.user.uid);

        docRef.set({
          users
        })
        this.tryUpdateUser(obj);
        alert("created");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  tryUpdateUser(obj) {
    let docRef = db.collection("users").doc(obj.user.uid);

    docRef.update({
      familyID:obj.familyID
    })
    .then(() => {
      db.collection("users").doc(obj.user.uid).get().then(snapshot => {
        let obj = {};
        obj.familyID = snapshot.data().familyID;
        this.setState(obj);
      })
    })
    
  }
  tryLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert("Invalid email or password.")
        this.setState({
          loginError: error.message
        })
      })
      .then(() => {

      })
  }
  tryJoinFamily(obj) {

    let docRef = db.collection("familyList").doc(obj.familyID);

    docRef.get().then((doc) => {
      if (doc.exists) {
        let users = [];
        doc.data().users.forEach((val) => users.push(val));
        users.push(obj.user.uid);
        docRef.update({
          users
        })
        this.tryUpdateUser(obj);
        alert("Successfully joined the family!")
      } else {
        alert("The family ID does not exist.")
      }
    })

  }
  trySignUp(obj) {
    firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
      .then(result => {
        let uid = result.user.uid;
        db.collection('users').doc(uid).set({
          lastName: obj.lastName,
          firstName: obj.firstName,
          email:obj.email,
        });
      })
  }
  trySignOut() {
    firebase.auth().signOut().then(() => {
      this.setState({familyID:undefined,isLoading:false,})
    }, function (error) {
      console.log(error);

    });
  }
  statusChange(menu) {
    this.setState({ status: menu });
  }
  render() {
    const { status,user,familyID,name,isLoading} = this.state;
    return (
      
      <Container>
          <Header>           
            <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()}/>
            </Left>
          </Header>
          <Content contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          
          <ImageBackground source={require('../components/img/family2.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={{ top: 60, justifyContent: 'center', alignItems: 'center' }}>
              {user && <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Verdana' }}>{`Welcome ${name}!`}</Text>}
              <Text style={{ color: 'white', fontSize: 50,fontFamily:'Verdana'}}>Family App</Text>
            </View>

            {status == "Sign In" && <Login statusChange={this.statusChange} tryLogin={this.tryLogin}/>}
            {status == "Register" && <Register statusChange={this.statusChange} trySignUp={this.trySignUp}/>}
            {status == "Make Group" && <AddFamily statusChange={this.statusChange} tryCreateFamily={this.tryCreateFamily} tryUpdateUser={this.tryUpdateUser} user={user} />}
            {status == "Join Group" && <JoinFamily statusChange={this.statusChange} tryJoinFamily={this.tryJoinFamily} tryUpdateUser={this.tryUpdateUser} user={user} />}
            {isLoading && <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="red" />
            </View>}
            
            
            {!user ? (<Offline statusChange={this.statusChange}/>) :
              (<Online statusChange={this.statusChange} trySignOut={this.trySignOut} familyID={this.state.familyID}/>)
            }
              
              
          </ImageBackground>
          </Content>
        
      </Container>
      
    );
  }

}

export default HomeScreen; 