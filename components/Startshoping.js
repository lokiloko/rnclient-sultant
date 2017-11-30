import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
// import { List, ListItem } from 'react-native-elements';
// import Modal from 'react-native-modal'


// import { Container, Header, Content, Form, Item, Input, Label, Button, Icon} from 'native-base';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Startshoping extends React.Component {
  static navigationOptions = {
    title: 'Start Shoping',
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, paddingTop: 20, paddingLeft: 30, paddingRight: 30, paddingBottom: 500}}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <Text>
            Aman
            </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
