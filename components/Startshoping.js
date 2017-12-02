import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  SectionList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Constants, ImagePicker, Camera, Permissions, FileSystem } from 'expo';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import { Container, Header, Content, Form, Item, Input, Label, Icon} from 'native-base';

import axios from 'axios'
import Dropbox from 'dropbox'

export default class Startshoping extends React.Component {
  static navigationOptions = {
    title: 'Start Shoping',
  };

  constructor() {
    super()
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      items: [],
      image: null,
      uploading: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'label'
    )
    .catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  _takePhoto = async () => {
    alert('Picture Taken')
    if (this.camera) {
      let pickerResult = await this.camera.takePictureAsync({
        quality: 0.5
      })

      this._handleImagePicked(pickerResult);
    } else {
      alert('Take Picture Error')
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      // alert('hai')
      console.log(pickerResult);
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let localUri = pickerResult.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        var ACCESS_TOKEN = 'jPHkzgRYYKAAAAAAAAAACwtSuHiIRQl4SKdPc9Ad3yxY0BxdCbA3eeIgdlrCZS8w';
        var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

        var self = this
        dbx.filesUpload({path: '/' + filename, contents: { uri: localUri, name: filename, type }})
          .then((response) => {
            console.log("File Uploaded", response)
            dbx.filesGetTemporaryLink({path: '/' + filename}).then((data) => {
              // console.log(data)
              axios.post("https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrGoogleVision", {imageUri: data.link})
              .then((axiosResponse) => {
                // console.log(axiosResponse.data.object);
                let newItems = self.state.items.slice()
                newItems.push(axiosResponse.data.object)

                self.setState({
                  items: newItems
                })
              }).catch((err) => {
                console.error('error axios', err)
              })
            }).catch(err => {
              console.error(err)
            })
          })
          .catch(function(error) {
            console.error(error);
          });
        // console.log(dbx)
      }
    } catch (e) {
      // console.log("----------------------------------->", { e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    const takePictureImage = 'http://www.freeiconspng.com/uploads/camera-icon-google-images-24.jpg'
    const imguri = 'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/24129614_10210614123930346_4311928442133126805_n.jpg?_nc_eui2=v1%3AAeFmBr5_jAksHWATxU71fb1aoyFlUXlYwgk9uS3xGS22niluU6JAORQmnNPx7kDgYZSlg74KhzlOddsaygN1AmLWlzk_Hovz8kgCr55G01s7tQ&oh=a77e1a0c9437286b040cce8aa155e9fb&oe=5A9748F6'
    const list = this.state.items

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View><Text>Loading</Text></View>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View>

        <View style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10,}}>
          <Camera
          ref={ref => { this.camera = ref }}
          style={{ backgroundColor: 'red'}}
          type={this.state.type}
          autoFocus={Camera.Constants.AutoFocus.on}>
            <TouchableOpacity onPress={() => this._takePhoto()}>
              <Image
                style={{width: 40, height: 40, borderRadius: 40, alignSelf: 'center', marginTop: 150}}
                source={{uri: takePictureImage}}
               />
            </TouchableOpacity>
          </Camera>
        </View>

        <List containerStyle={{marginBottom: 20}}>
        <Text style={{fontSize: 24}}>List of Items</Text>
        { list.length != 0 ?
          list.map((item, index) => (
            <ListItem
            roundAvatar
            avatar={{uri: imguri}}
            key={index}
            title={item.name} />
          ))
        : <Text>No Item Yet</Text> }
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
