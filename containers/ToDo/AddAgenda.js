import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';

class AddAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      user: this.props.user,
      day: this.props.timeToString(this.props.day),
      addAgenda: "",
      familyID:this.props.familyID,

    }
  }
  

  render() {
    const { user,day,addAgenda } = this.state;
    const { closeAgenda,timeToString,tryCreateAgenda } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 50, color: 'white', fontWeight: 'bold', fontSize: 20,}}>{day}</Text>
        <Text style={styles.header}>Add Agenda</Text>
        <View style={styles.input}><TextInput style={styles.textInput}
          value={addAgenda}
          placeholder="Add Agenda"
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ addAgenda: text })}
        /></View>

        <TouchableOpacity onPress={() => {
          if (this.state.addAgenda == "") return;
          tryCreateAgenda(this.state);
          closeAgenda();
        }} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ffcc5c' }}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={closeAgenda} style={styles.exit}>
          <Text  style={styles.x}>X</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#88d8b0',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    fontSize: 36,
    borderRadius: 10,
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 120,
    fontWeight: 'bold',
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
    marginTop: 100,
    backgroundColor: '#00b159',
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
})

export default AddAgenda;