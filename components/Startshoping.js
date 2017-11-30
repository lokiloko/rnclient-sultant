import React from 'react';
import { ScrollView, SectionList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import { Container, Header, Content, Form, Item, Input, Label, Icon} from 'native-base';

export default class Startshoping extends React.Component {
  static navigationOptions = {
    title: 'Start Shoping',
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photos: [],
    photoId: 1
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    )
    .catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  async takePicture () {
    if (this.camera) {
      this.camera.takePicture().then(data => {
        let date = new Date()
        FileSystem.moveAsync({
          from: data,
          to: `${FileSystem.documentDirectory}DCIM/Photo${date}_item.jpg`,
        }).then((data) => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    } else {
      alert('gamasuk')
    }
  };

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }

  render() {
    const list = [
      {
        name: 'Ayam Bawang',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
      {
        name: 'Somai Goreng',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
    ]

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View><Text>Tatata</Text></View>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View>

        <View style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30,}}>
        <Camera ref={ref => { this.camera = ref }} style={{ paddingBottom:100 }} type={this.state.type}>
        </Camera>
        <Text style={{'color':'white'}} onPress={ () => this.takePicture()}>[CAPTURE]</Text>
        </View>

        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem roundAvatar avatar={{uri:l.avatar_url}} key={i} title={l.name} />
          ))
        }
        </List>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pembungkus: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  kontainer: {
    flex: 1,
    flexDirection:'column',
  },
  contentContainer: {
    paddingVertical: 50,
  },
});
