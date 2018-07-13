import React, { Component } from 'react';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView, Image, TextInput,TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class Message extends Component{
  constructor(props) {
    super(props);
    this.state = {
      texts: this.props.texts,
      text: "",
      name: this.props.name,
      familyID:this.props.familyID,

    }
  }

  render() {
    const { texts,sendMessage } = this.props;
    const { text } = this.state;

    let messages = texts.map((val, i) => {

      if (val.name != this.props.name) {
        return (<View key={i} style={{ marginLeft: 20, marginRight: 20, }}>
                  <View>
                    <Text style={styles.name}>{val.name}</Text>
                  </View>
                  <View style={styles.message}>
                    <Text style={styles.text}>{val.text}</Text>
                  </View>
                </View>)
      } else {
        return (<View key={i} style={{ marginLeft: 20, marginRight: 20, }}>
                  <View style={{alignItems:'flex-end'}}>
                    <Text style={styles.myName}>{val.name}</Text>
                  </View>
                  <View style={styles.myMessage}>
                    <Text style={styles.text}>{val.text}</Text>
                  </View>
                </View>)

      }
      
    })
    return (
      
      <View style={styles.container}>
        <ScrollView>
          {messages}
          </ScrollView>
        <View style={styles.send}>
          <TextInput
            style={styles.textInput}
            value={text}
            placeholder=" "
            placeholderTextColor="#e6e6e6"
            onChangeText={(text) => this.setState({ text})}
          />
          <TouchableOpacity onPress={() => {
            sendMessage(this.state)
            this.setState({ text: "" })
            
          }} style={styles.button}>
            <Feather style={{fontSize:25}} name="arrow-up" />
          </TouchableOpacity>
        </View>
        </View>  
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',

  },
  header: {

  },
  message: {
    borderWidth: 1,
    height:30,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: -1,
    borderRadius: 30,
    marginBottom: 5,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    marginBottom:5,
    color: '#C78683',

  },
  myMessage: {
    borderWidth: 1,
    height: 30,
    borderColor: 'black',
    backgroundColor: 'dodgerblue',
    marginTop: -1,
    borderRadius: 30,
    marginBottom: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  myName: {
    fontSize: 15,
    marginBottom: 5,
    color: '#C78683',
    

  },
  text: {

  },
  send: {
    position: 'absolute',
    bottom:0,
    width:'100%',
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "white",
    height: 40,
    flexDirection:'row',
  },
  textInput: {
    paddingLeft:10,
    marginTop: -5,
    marginBottom:-5,
    height: 30,
    backgroundColor: "#e6e6e6",
    width: '80%',
    borderRadius: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems:'center',
    height: 30,
    width:30,
    backgroundColor: "yellow",
    borderRadius: 100,
    left:10
  }
  
})

export default Message;