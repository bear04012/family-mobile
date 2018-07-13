import React, { Component } from 'react';
import { firebase, db } from '../../utils/db';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class Families extends Component {
  constructor(props) {
    super(props)
    this.state = {
      families : this.props.families,
      familyID : this.familyID,

    }
  }

  render() {
    const { families } = this.props;

    let members = families.map((val, i) => {

      if (val.firstName == this.props.name) {
        return (<View style={styles.userInfo} key={i}>

          <Text>{`first name: ${val.firstName}, last name: ${val.lastName}`}</Text>

          <TouchableOpacity onPress={this.props.openWarning} ><Text style={{ color: 'red' }}>Leave</Text></TouchableOpacity>
        </View>)
        
      } else {
        return(<View style={styles.userInfo} key={i}>

          <Text>{`first name: ${val.firstName}, last name: ${val.lastName}`}</Text>

        </View>)
      }
      
    })


    return (
      <View style={styles.container}>
        {members}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding:20,
  },
  userInfo: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    backgroundColor: 'white',
    paddingBottom: 15,
    marginTop: -1,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent:"space-between"
  }

})


export default Families;