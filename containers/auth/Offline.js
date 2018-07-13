import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

class Offline extends Component{
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.statusChange("Sign In")} style={{ backgroundColor: 'yellow', width: 280, height: 50, top: 380, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 10 }}>
          <Text style={{ color: 'blueviolet', fontFamily: 'Verdana', fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.statusChange("Register")} style={{ backgroundColor: '#00ced1', width: 280, height: 50, top: 380, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ff69b4' }}>Register</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

export default Offline;