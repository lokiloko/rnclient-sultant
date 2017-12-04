import React from 'react';
import { connect } from 'react-redux'
import {
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  SectionList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  Easing
} from 'react-native';
import {
  Constants,
  ImagePicker,
  Camera,
  Permissions,
  FileSystem,
} from 'expo';
import { StackNavigator } from 'react-navigation';
import {
  Avatar,
  List,
  ListItem,
  Button
} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon
} from 'native-base';
import Modal from 'react-native-modal'
import axios from 'axios'
import Dropbox from 'dropbox'

import { postTransactions } from '../actions'

class Startshoping extends React.Component {
  static navigationOptions = {
    title: 'Start Shoping',
  };
  constructor() {
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      isModalVisible: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      list: [],
      image: null,
      uploading: false,
      item: {},
      totalPrice: 0,
      index: 0,
      isLoading: false
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

    AsyncStorage.getItem('budget').then((data) => {
      this.setState({
        budget: parseInt(data)
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }

  componentDidMount () {
    this.StartImageRotateFunction()
  }

  StartImageRotateFunction () {
    this.RotateValueHolder.setValue(0)

    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.StartImageRotateFunction())

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
      this.setState({
        isLoading: false
      })
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      // alert('hai')
      console.log(pickerResult);
      this.setState({
        uploading: true,
        isLoading: true
      });

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
                let newItems = self.state.list.slice()
                axiosResponse.data.object.qty = '1'

                newItems.unshift(axiosResponse.data.object)

                self.setState({
                  list: newItems,
                  isLoading: false
                })
              }).catch((err) => {
                // console.error('error axios', err)
                alert('Sorry couldnt proccess you request')

                self.setState({
                  isLoading: false
                })

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

  _showModal = function (data) {
    this.setState({ item: data });
    this.setState({ isModalVisible: true })
  }

  _hideModal = () => this.setState({ isModalVisible: false })

  bukamodal (data, dataIndex) {
    console.log(dataIndex)
    let item = {
      name: data.name,
      category: data.category,
      qty: data.qwt,
      price: data.price,
    }
    this.setState({ index: dataIndex})
    this.setState({ item: data });
    this.setState({ isModalVisible: true })
    console.log('in', this.state.index);
  }

  qty (datanya) {
    // this.price(datanya)
    let item = {
      name: this.state.item.name,
      category: this.state.item.category,
      qty: datanya,
      price: this.state.item.price,
      total: Number(this.state.item.price * datanya)
    }

    this.setState({item}, () => {
      console.log('sata', this.state.item);
    })
  }

  removeItem (index) {
    // console.log("indexnya", index);
    let newList = this.state.list.filter((item, idx) => {
      return idx != index
    })

    this.setState({
      list: newList
    })
  }

  simpanBelanjaan () {
    this.state.list.splice(this.state.index, 1, this.state.item)

    // console.log('arraynya', this.state.list);
    this.setState({ isModalVisible: false })
  }

  belanja () {
    let newBudget = this.state.budget - this.state.totalPrice

    this.setState({
      budget: newBudget
    })

    // alert(newBudget)

    AsyncStorage.setItem('budget', newBudget.toString())
    AsyncStorage.getItem('iduser').then((data) => {
      let obj = {
        totalPrice: this.state.totalPrice,
        user: data,
        items: this.state.list
      }

      this.props.updateTransaction(obj)

      AsyncStorage.getItem('budget').then((data) => {
        // alert('bazingan' + data)
        this.props.navigation.navigate('Currentballance')
      })
    })
  }

  render() {
    const { hasCameraPermission, isLoading } = this.state;
    const takePictureImage = 'http://www.freeiconspng.com/uploads/camera-icon-google-images-24.jpg'
    const imguri = 'http://downloadicons.net/sites/default/files/recycle-bin-logo-icon-66421.png'
    const list = this.state.list
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    this.state.totalPrice = 0
    for (var i = 0; i < list.length; i++) {
      this.state.totalPrice += (Number(list[i].price * Number(list[i].qty)))

      if (i === list.length-1) {
        if (this.state.budget - this.state.totalPrice <= 0) {
          alert('Aseloleeeeeee Cuuukkkk')
        }
      }
    }
    // console.log(this.state.totalPrice)
    if(isLoading) {
      return (
        <Image source={{uri: 'https://i.pinimg.com/originals/9a/d0/3d/9ad03d1be00db96fe779b55c7dbc0e95.jpg'}} style={styles.backgroundImage}>
          <Animated.Image
            style={[styles.imageLogo,
              {
                transform: [{
                  rotate: RotateData
                }]
              }
            ]}
            source={require('./sultant.png')}
          />
          <Text style={{color: 'white'}}>Proccessing, please wait...</Text>
        </Image>
      )
    } else {
      if (hasCameraPermission === null) {
        return <View><Text>Loading</Text></View>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
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


            <View>
              <List containerStyle={{marginBottom: 20}}>
              <Text style={styles.pembungkus}>
                <Text style={{flex: 1, fontSize: 24, textAlign: 'center',}}>Total Price:    Rp </Text>
                <Text style={{flex: 1, fontSize: 24, textAlign: 'right',}}>{this.state.totalPrice}</Text>
              </Text>
              { list.length != 0 ?
                this.state.list.map((item, index) => (
                  <View key={index} style={{flex: 1, flexDirection: 'row', width: '100%'}}>
                    <View style={{width: 40, marginTop:10}}>
                      <Avatar
                        small
                        rounded
                        source={{uri: imguri}}
                        onPress={() => this.removeItem(index)}
                      />
                    </View>
                    <View style={{width: '90%'}}>
                      <ListItem
                      title={item.name}
                      onPress={() => this.bukamodal(item, index)}
                      />
                    </View>
                  </View>
                ))
              : <Text>No Item Yet</Text> }
              </List>
              <View>
                <Button
                title='Save Belanjaan'
                buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                onPress={() => this.belanja() }
                />
              </View>
            </View>
          </View>
          <View>
              <Modal
              isVisible={this.state.isModalVisible}
              style={styles.bottomModal}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              >
              <View>
                <Text style={styles.textinputval}>Nama Barang</Text>
                <TextInput
                  style={styles.textinput}
                  value={this.state.item.name}
                />
                <Text style={styles.textinputval}>Quantity Barang</Text>
                <TextInput
                  style={styles.textinput}
                  onChangeText={(data) => this.qty(data)}
                  value={this.state.item.qty}
                  keyboardType={'numeric'}
                />
                <Text style={styles.textinputval}>Category Barang</Text>
                <TextInput
                  style={styles.textinput}
                  value={this.state.item.category}
                />
                <Text style={styles.textinputval}>Price Barang</Text>
                <TextInput
                  style={styles.textinput}
                  value={this.state.item.price}
                />
                <Text style={styles.textinputval}>Total Price:   {this.state.item.total}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}}>
                <View style={{flex: 1}}>
                  <Button
                  title='Cancel'
                  buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                  onPress={this._hideModal}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Button
                  title='Save'
                  buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                  onPress={() => this.simpanBelanjaan()}
                  />
                </View>
              </View>
              </Modal>
          </View>
          </ScrollView>
        );
      }
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
    // paddingVertical: 50,
    // paddingBottom: 50,
  },

  backgroundImage: {
   flex: 1,
   width: null,
   height: null,
   resizeMode: 'cover',
   flexDirection: 'column',
   alignItems: 'center',
   paddingTop: '50%'
  },

  imageLogo: {
    width: 100,
    height: 100,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 20
  },

  bottomModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textinput: {
    height: 40,
    width: responsiveWidth(80),
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    color: '#000000',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTransaction: (transaction) => dispatch(postTransactions(transaction))
  }
}

export default connect(null, mapDispatchToProps)(Startshoping)
