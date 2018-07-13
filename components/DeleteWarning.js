import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';

class DeleteWarning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{ marginTop: 20, color: 'gray', fontSize: 30, fontStyle: 'bold' }}> Whoa! There, </Text>
          <Text style={{color:'gray',marginTop:10}}>{this.props.text}</Text>
          <View style={{flexDirection:'row',marginTop:20,}}>

            <Button onPress={() => {
              this.props.delete();
              this.props.close();
            }} style={styles.button} title="Delete" />
            <Button onPress={this.props.close} style={styles.button} title="Cancel"/>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  box: {
    backgroundColor: 'white',
    width: 300,
    height: 150,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {

  }

})

export default DeleteWarning;