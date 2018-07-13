import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image,TextInput,TouchableOpacity } from 'react-native';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      
      
    }
  }

  render() {
    const { email, password } = this.state;
    const { statusChange,tryLogin } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>

        <View style={styles.input}><TextInput style={styles.textInput}
          value={email}
          textContentType="emailAddress"
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ email: text})}
        /></View>
        <View style={styles.input}><TextInput style={styles.textInput}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ password: text })}
        /></View>
        <TouchableOpacity onPress={() => {
          tryLogin(email, password);
          statusChange("");
        }} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ff69b4' }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exit}>
          <Text onPress={() => statusChange("")} style={styles.x}>X</Text>
        </TouchableOpacity> 
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#ffcc5c',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    paddingTop: 100,
    fontSize: 36,
    borderRadius: 10,
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 80,
    fontWeight:'bold',
  },
  input: {
    width: '80%',
    height: 30,
    backgroundColor: 'transparent',
    marginBottom: 50,
    borderBottomWidth: 1
  },
  button: {
    width: '80%',
    height: 50,
    marginTop:30,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  exit: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
  x: {
    fontSize: 20,
  }
});
export default Login; 