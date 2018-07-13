import React, { Component } from 'react';
import { firebase, db } from '../utils/db';
import { Constants } from "expo";
import { StyleSheet, Text, View, ScrollView,TouchableHighlight,Image,CameraRoll} from 'react-native';

import { Icon, Button, Container, Content, Header, Left } from 'native-base';

class Galleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      familyID: undefined,
      name: "",
      photos:"",
    }
    this.unscub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let obj = { user };

        db.collection("users").doc(user.uid).get().then(snapshot => {
          if (snapshot.data().familyID) {
            obj.familyID = snapshot.data().familyID;

          }
          obj.name = snapshot.data().firstName;
          this.setState(obj);
        })

      } else {
        this.setState({
          user: undefined
        })
      }
    });

  }
  componentWillUnmount() {
    this.unscub();
  }
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  render() {
    const { user, familyID } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>

          {familyID ? <Text style={styles.header}>{familyID}</Text> : <Text style={styles.header}>Family has not founded</Text>}
        </Header>
        <Content contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <TouchableHighlight
            onPress={this._handleButtonPress}
          >
            <Text>"Load Images"</Text>
          </TouchableHighlight>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
          
        </Content>
      </Container>
    );
  }

}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    top: 10,
  }

})


export default Galleries; 