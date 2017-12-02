import React from 'react';
import { AsyncStorage, TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import axios from 'axios'
import { postUser } from '../actions/index'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {connect} from 'react-redux'

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home Native API'
  // };

  constructor(props) {
    super(props)
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

    }
  }

  componentWillMount () {
    // AsyncStorage.setItem('name', 'nama');
    AsyncStorage.getItem('iduser', (error, result) => {
        if (result) {
            // this.setState({
            //     id: result
            // });

        }
    });
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
    // console.log(object);
  }

  scanKtp () {
    this.props.navigation.navigate('Scanktp')
  }

  A (){
    this.props.navigation.navigate('Scanktp')
  }

  B (){
    this.props.navigation.navigate('Scanktp')
  }

  C (){
    this.props.navigation.navigate('Scanktp')
  }

  D (){
    this.props.navigation.navigate('Scanktp')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image source={{uri: 'https://i.pinimg.com/originals/9a/d0/3d/9ad03d1be00db96fe779b55c7dbc0e95.jpg'}} style={styles.backgroundImage}>

      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.containerinput}>
          <Image
          style={styles.imageLogo}
          source={require('./sultant.png')}
          />
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

        <View style={{flexDirection: 'row', paddingTop: 20}}>
          <View style={{flex: 1}}>
          <Button
          title='Scan KTP'
          buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
          onPress={
            () => {
              this.scanKtp()
            }
          }
          />
          </View>

          <View style={{flex: 1}}>
          <Button
          title='Simpan'
          buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
          onPress={
            () => {
              this.simpanDataUser()
            }
          }
          />
          </View>
        </View>

        <Button
        title='Simpan'
        buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
        onPress={
          () => {
            this.A()
          }
        }
        />
        <Button
        title='Simpan'
        buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
        onPress={
          () => {
            this.B()
          }
        }
        />
        <Button
        title='Simpan'
        buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
        onPress={
          () => {
            this.C()
          }
        }
        />
        <Button
        title='Simpan'
        buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
        onPress={
          () => {
            this.D()
          }
        }
        />

      </View>
      </ScrollView>

      </Image>
    );
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

const mapState = state => {
  console.log(state.dataUser)
  return {
    // dataUser: state.dataUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUser: (object) => dispatch(postUser(object)),
  }
}

const Home = connect(
  mapState,
  mapDispatchToProps
)(HomeScreen)

export default Home;
