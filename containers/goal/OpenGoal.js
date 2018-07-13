import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, CameraRoll,TextInput } from 'react-native';

class OpenGoal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: "",
      familyID: this.props.familyID,
      name: this.props.name,
    }
  }

  render() {
    const { goal } = this.state;
    const { closeGoal,tryCreateGoal } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add Goal</Text>

        <View style={styles.input}><TextInput style={styles.textInput}
          value={goal}
          placeholder="Add a Goal"
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ goal: text })}
        /></View>

        <TouchableOpacity onPress={() => {
          if (this.state.goal == "") return;
          tryCreateGoal(this.state);
          closeGoal();
        }} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'Verdana', color: '#ffcc5c' }}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={closeGoal} style={styles.exit}>
          <Text  style={styles.x}>X</Text>
        </TouchableOpacity> 

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#A13742',
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

export default OpenGoal;