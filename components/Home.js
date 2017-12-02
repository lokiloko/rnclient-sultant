import React from 'react';
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  AsyncStorage,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Clipboard,
  Share,
  StatusBar,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import Exponent, { Constants, ImagePicker, registerRootComponent, FileSystem } from 'expo';
import Dropbox from 'dropbox'
import axios from 'axios'

import { postUser } from '../actions/index'
import Inputbudget from './Inputbudget'

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
     nik: 0,
     nama: '',
     provinsi: '',
     kota: '',
     jenisKelamin: '',
     agama: '',
     status: '',
     tempatLahir: '',
     tanggalLahir: '',
     budget: 0
    }
  }

componentWillMount() {
  AsyncStorage.getItem('iduser').then((data) => {
    if (data) {
      this.setState({
        budget: 1
      })
    } else {
      this.setState({
        budget: 2
      })
    }
  }).catch((reason) => {
    console.log(reason);
  })
}

simpanDataUser () {
  let object = {
   nik: this.state.nik,
   nama: this.state.nama,
   provinsi: this.state.provinsi,
   kota: this.state.kota,
   jenisKelamin: this.state.jenisKelamin,
   agama: this.state.agama,
   status: this.state.status,
   tempatLahir: this.state.tempatLahir,
   tanggalLahir: this.state.tanggalLahir,
  }

  this.props.postUser(object)
}

_maybeRenderUploadingOverlay = () => {
  if (this.state.uploading) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <ActivityIndicator color="#fff" animating size="large" />
      </View>
    );
  }
};

_maybeRenderImage = () => {
  let { image } = this.state;
  if (!image) {
    return;
  }

  return (
    <View
      style={{
        marginTop: 30,
        width: 250,
        borderRadius: 3,
        elevation: 2,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
      }}>
      <View
        style={{
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          overflow: 'hidden',
        }}>
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
      </View>

      <Text
        onPress={this._copyToClipboard}
        onLongPress={this._share}
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {image}
      </Text>
    </View>
  );
};

_share = () => {
  Share.share({
    message: this.state.image,
    title: 'Check out this photo',
    url: this.state.image,
  });
};

_copyToClipboard = () => {
  Clipboard.setString(this.state.image);
  alert('Copied image URL to clipboard');
};

_takePhoto = async () => {
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  this._handleImagePicked(pickerResult);
};

_handleImagePicked = async pickerResult => {
  try {
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
        .then(function(response) {
          console.log("File Uploaded", response)
          dbx.filesGetTemporaryLink({path: '/' + filename}).then((data) => {
            // console.log(data)
            axios.post("https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrKtp", {imageUri: data.link})
            .then((axiosResponse) => {
              self.setState({
                nik: axiosResponse.data.object.nik,
                nama: axiosResponse.data.object.nama,
                provinsi: axiosResponse.data.object.provinsi,
                kota: axiosResponse.data.object.kota,
                jenisKelamin: axiosResponse.data.object.jenisKelamin,
                agama: axiosResponse.data.object.agama,
                status: axiosResponse.data.object.status,
                tempatLahir: axiosResponse.data.object.tempatLahir,
                tanggalLahir: axiosResponse.data.object.tanggalLahir,
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

rendering() {
  if (this.state.budget === 0) {
    return (
      <View><Text>Loading</Text></View>
    )
  } else if (this.state.budget === 1) {
    return (
      this.props.navigation.navigate('Inputbudget')
    )
  } else {
    return (
      <Image source={{uri: 'https://i.pinimg.com/originals/9a/d0/3d/9ad03d1be00db96fe779b55c7dbc0e95.jpg'}} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
         <View style={styles.container}>
           <View style={styles.containerinput}>
             <Image
               style={styles.imageLogo}
               source={require('./sultant.png')}/>
           </View>

           <View style={styles.containerinput}>
             <Text style={styles.textinputval}>NIK</Text>
             <TextInput
               style={styles.textinput}
               onChangeText={(nik) => this.setState({nik})}
               value={this.state.nik}
             />

             <Text style={styles.textinputval}>Nama</Text>
             <TextInput
               style={styles.textinput}
               onChangeText={(nama) => this.setState({nama})}
               value={this.state.nama}
             />

            <Text style={styles.textinputval}>Jenis Kelamin</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(jenisKelamin) => this.setState({jenisKelamin})}
               value={this.state.jenisKelamin}
            />

            <Text style={styles.textinputval}>Provinsi</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(provinsi) => this.setState({provinsi})}
               value={this.state.provinsi}
            />

            <Text style={styles.textinputval}>Kota</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(kota) => this.setState({kota})}
               value={this.state.kota}
            />

            <Text style={styles.textinputval}>Agama</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(agama) => this.setState({agama})}
               value={this.state.agama}
            />

            <Text style={styles.textinputval}>Status</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(status) => this.setState({status})}
               value={this.state.status}
            />

            <Text style={styles.textinputval}>Tempat Lahir</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(tempatLahir) => this.setState({tempatLahir})}
               value={this.state.tempatLahir}
            />

            <Text style={styles.textinputval}>Tanggal Lahir</Text>
            <TextInput
               style={styles.textinput}
               onChangeText={(tanggalLahir) => this.setState({tanggalLahir})}
               value={this.state.tanggalLahir}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
            <View style={{flex: 1}}>
             <Button
                title='Scan KTP'
                buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                onPress={this._takePhoto}
             />

             {this._maybeRenderImage()}
             {this._maybeRenderUploadingOverlay()}

             <StatusBar barStyle="default" />
            </View>

            <View style={{flex: 1}}>
              <Button
                title='Simpan'
                buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                onPress={() => this.simpanDataUser()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
     </Image>
    );
  }
}

render() {
  return this.rendering()
 }
}

const styles = StyleSheet.create({
 container: {
  alignItems: 'center'
 },

 contentContainer: {

 },

 textinput: {
  height: 40,
  width: responsiveWidth(80),
  borderColor: 'white',
  borderWidth: 2,
  paddingLeft: 20,
  paddingRight: 20,
  marginBottom: 10,
  color: '#ffffff',
 },

 containerinput: {
  paddingTop: 20,
 },

 backgroundImage: {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover'
 },

 textinputval: {
  color: '#ffffff'
 },

 imageLogo: {
  width: 150,
  height: 150,
  resizeMode: Image.resizeMode.contain,
 },

 imageLogin: {
  width: 200,
  height: 200,
  resizeMode: Image.resizeMode.contain
 },

 appName: {
  paddingTop: 70,
  paddingBottom: 50,
  fontSize: 20,
 },

 HomeScreen: {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover'
 }
});

const mapStateToProps = (state) => {
 console.log(state)
 return {
  // idUser: state.userReducers.dataUser._id
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
  postUser: (object) => dispatch(postUser(object)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
