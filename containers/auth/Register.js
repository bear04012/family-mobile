import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image,TextInput,TouchableOpacity } from 'react-native';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName:"",
    }
  }

  render() {
    const { statusChange, trySignUp } = this.props;
    const { email, password, firstName, lastName } = this.state;
    return (
      <View style={styles.container}>
        
        <Text style={styles.header}>Registration</Text>

        <View style={styles.input}><TextInput style={styles.textInput}
          placeholder="Last Name"
          value={lastName}
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ lastName: text })}
        /></View>
        <View style={styles.input}><TextInput style={styles.textInput}
          placeholder="First Name"
          value={firstName}
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ firstName: text })}
        /></View>

        <View style={styles.input}><TextInput style={styles.textInput}
          textContentType="emailAddress"
          placeholder="Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ email: text })}
        /></View>
        <View style={styles.input}><TextInput style={styles.textInput}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ password: text })}
        /></View>
        <TouchableOpacity onPress={() => {
          trySignUp(this.state);
          statusChange("");
        }} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ff69b4' }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.exit}>
          <Text onPress={() => statusChange("")} style={styles.x}>X</Text>
        </TouchableOpacity> 
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor: 'dodgerblue',
    height: '100%',
    width:'100%',
    alignItems: 'center',
    zIndex:10,
  },
  header: {
    paddingTop:100,
    fontSize: 36,
    borderRadius:10,
    textDecorationLine:'underline',
    color: 'white',
    marginBottom: 80,
    fontWeight:'bold',
  },
  button: {
    marginTop:20,
    width: '80%',
    height: 50,
    backgroundColor: '#00ced1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
  },
  input: {
    width: '80%',
    height:30,
    backgroundColor: 'transparent',
    marginBottom:30,
    borderBottomWidth:1
  },
  exit: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 10,
    right:10,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  x: {
    fontSize:20,
    
  }
});


export default Register; 