import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

class Online extends Component {
  render() {
    const { familyID } = this.props;
    return (
      <View>
        {!familyID ? (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => this.props.statusChange("Make Group")} style={{ backgroundColor: '#ffcc5c', width: 120, height: 50, top: 360, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10,marginLeft:10 }}>
              <Text style={{ color: 'blueviolet', fontFamily: 'Verdana', fontWeight: 'bold' }}>Add Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.statusChange("Join Group")} style={{ backgroundColor: '#ff6f69', width: 120, height: 50, top: 360, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10,marginLeft:20 }}>
              <Text style={{ color: 'blueviolet', fontFamily: 'Verdana', fontWeight: 'bold' }}>Join Group</Text>
            </TouchableOpacity>
          </View>) :
          <View style={{ backgroundColor: 'gray', width: 280, height: 50, top: 380, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 10 }}>
            <Text style={{color:'white',fontFamily:'Verdana',fontWeight:'bold'}}> {`Group: ${familyID}`} </Text>
          </View>
          
       }
        
        <TouchableOpacity onPress={() => this.props.trySignOut()} style={{ backgroundColor: '#00ced1', width: 280, height: 50, top: 380, left: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ff69b4' }}>SignOut</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

export default Online;