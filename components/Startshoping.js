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
  Button,
  Card
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
import formatRupiah from '../helpers/formatRupiah'

class Startshoping extends React.Component {
  static navigationOptions = {
    title: 'Start Shoping',
  };
  constructor() {
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      isModalVisible: false,
      isModalVisibleX: false,
      isDeleteAlert: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      list: [],
      suggestionKeep: [],
      suggestionRemove: [],
      image: null,
      uploading: false,
      item: {},
      itemIndex: 0,
      itemName: '',
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
        quality: 0.15
      })

      this.setState({
        isLoading: true
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
      console.log(pickerResult);
      this.setState({
        uploading: true,
      });

      if (!pickerResult.cancelled) {

        let localUri = pickerResult.uri;
        let filename = localUri.split('/').pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        var ACCESS_TOKEN = '0_AqSl7cNVAAAAAAAAAACAfDZ584ECmF3E754bytZYjY1sMhzvDRu4hdoyHai8MB';
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
                axiosResponse.data.object.total = Number(axiosResponse.data.object.price * axiosResponse.data.object.qty)

                newItems.unshift(axiosResponse.data.object)

                self.setState({
                  list: newItems,
                  isLoading: false
                }, () => {
                  if (self.state.budget - (self.state.totalPrice) <= 0) {
                    axios.post("https://us-central1-pure-faculty-187614.cloudfunctions.net/shopSuggestion", {
                      priority: self.props.navigation.state.params.priority,
                      items: self.state.list
                    }).then((axiosResponseSuggestion) => {
                      self.setState({
                        suggestionKeep: axiosResponseSuggestion.data.suggest_keep,
                        suggestionRemove: axiosResponseSuggestion.data.suggest_remove
                      }, () => {
                        self._showModalX()
                      })
                    }).catch((err) => {
                      console.log(err)
                    })
                  }
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
      if (this.state.budget - (this.state.totalPrice + item.total) <= 0) {
        axios.post("https://us-central1-pure-faculty-187614.cloudfunctions.net/shopSuggestion", {
          priority: this.props.navigation.state.params.priority,
          items: this.state.list
        }).then((axiosResponse) => {
          this.setState({
            suggestionKeep: axiosResponse.data.suggest_keep,
            suggestionRemove: axiosResponse.data.suggest_remove
          }, () => {
            this._showModalX()
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  removeItem (index) {
    // console.log("indexnya", index);
    let newList = this.state.list.filter((item, idx) => {
      return idx != index
    })

    this._hideDeleteModal()

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

  ShowSuggestion () {
    let self = this
    axios.post("https://us-central1-pure-faculty-187614.cloudfunctions.net/shopSuggestion", {
      priority: self.props.navigation.state.params.priority,
      items: self.state.list
    }).then((axiosResponseSuggestion) => {
      self.setState({
        suggestionKeep: axiosResponseSuggestion.data.suggest_keep,
        suggestionRemove: axiosResponseSuggestion.data.suggest_remove
      }, () => {
        self._showModalX()
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  _showDeleteModal = (index) => this.setState({ isDeleteAlert: true, itemIndex: index, itemName: this.state.list[index].name})
  _showModalX = () => this.setState({ isModalVisibleX: true })
  _hideModalX = () => this.setState({ isModalVisibleX: false })
  _hideDeleteModal = () => this.setState({ isDeleteAlert: false, itemIndex: 0, itemName: '' })

  render() {
    const { hasCameraPermission, isLoading } = this.state;
    const takePictureImage = 'http://www.freeiconspng.com/uploads/camera-icon-google-images-24.jpg'
    const imguri = 'http://files.softicons.com/download/system-icons/windows-8-metro-icons-by-dakirby309/png/512x512/Folders%20&%20OS/Recycle%20Bin%20Full.png'
    const list = this.state.list
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    this.state.totalPrice = 0
    for (var i = 0; i < list.length; i++) {
      this.state.totalPrice += (Number(list[i].price * Number(list[i].qty)))
    }
    // console.log(this.state.totalPrice)
    if(isLoading) {
      return (
        <View style={styles.backgroundLoading}>
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
          <Text style={{color: 'white', fontSize: 18}}>Proccessing, please wait...</Text>
        </View>
      )
    } else {
      if (hasCameraPermission === null) {
        return <View><Text>Loading</Text></View>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{backgroundColor: 'white', height: '100%'}}>
            <View style={{ paddingTop: 30, paddingLeft: 10, paddingRight: 10, backgroundColor: '#0b8b00ff'}}>
              <Camera
              ref={ref => { this.camera = ref }}
              style={{ backgroundColor: 'red'}}
              type={this.state.type}
              autoFocus={Camera.Constants.AutoFocus.on}
              focusDepth={1}>
                <TouchableOpacity onPress={() => this._takePhoto()}>
                  <Image
                    style={{width: 40, height: 40, borderRadius: 40, alignSelf: 'center', marginTop: 150}}
                    source={{uri: takePictureImage}}
                   />
                </TouchableOpacity>
              </Camera>
            </View>

            <Text style={styles.pembungkus}>
              <Text style={{flex: 1, fontSize: 24, textAlign: 'center', color: '#0b8b00ff'}}>Total Price : </Text>
              <Text style={{flex: 1, fontSize: 24, textAlign: 'right',}}>{this.state.totalPrice ? formatRupiah(this.state.totalPrice) : formatRupiah('0')}</Text>
            </Text>

            <View style={styles.contentContainer}>
              <ScrollView>
                <View style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10,}}>
                  <List containerStyle={{marginBottom: 20}}>
                  { list.length != 0 ?
                    this.state.list.map((item, index) => (
                      <View key={index} style={{borderBottomWidth: 1,flex: 1, flexDirection: 'row', width: '100%'}}>
                        <View style={{paddingLeft: 10, width: 0, marginTop: 5}}>
                          <Avatar
                            small
                            rounded
                            source={{uri: imguri}}
                            onPress={() => this._showDeleteModal(index)}
                          />
                        </View>
                        <View style={{width: '100%', paddingLeft: 30}}>
                          <ListItem
                          containerStyle={{borderBottomWidth: 0, borderBottomColor: '#ffffff'}}
                          title={item.name}
                          onPress={() => this.bukamodal(item, index)}
                          />
                        </View>
                      </View>
                    ))
                  : <Text style={{alignSelf: 'center', marginTop: 10}}>No Item Yet</Text> }
                  </List>
                </View>
              </ScrollView>
            </View>

            <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Button
                title='Suggestion'
                fontWeight="bold"
                fontSize={16}
                buttonStyle={{width: 150, backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: '#0b8b00ff'}}
                color="#0b8b00ff"
                onPress={() => this.ShowSuggestion()}
              />

              <Button
                title='Finish Shopping'
                fontWeight="bold"
                fontSize={16}
                buttonStyle={{width: 150, backgroundColor: '#0b8b00ff', borderRadius: 10, borderWidth: 2, borderColor: '#0b8b00ff'}}
                color='white'
                onPress={() => this.belanja() }
              />
            </View>

            <View>
              <Modal
                isVisible={this.state.isDeleteAlert}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  padding: 22,
                  justifyContent: 'center'
                }}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}>

                <View style={{
                  height: 150,
                  backgroundColor: 'white',
                  borderRadius: 4,
                  padding: 10,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                  <Text style={{alignSelf: 'center', fontSize: 18}}>Are you sure you want to delete {this.state.itemName} ?</Text>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, justifyContent: 'center'}}>
                    <Button
                      title='Cancel'
                      fontWeight="bold"
                      fontSize={16}
                      buttonStyle={{width: 100, backgroundColor: 'red', borderRadius: 10, borderWidth: 2, borderColor: 'red'}}
                      onPress={this._hideDeleteModal}
                    />
                    <Button
                      title='Delete'
                      fontWeight="bold"
                      fontSize={16}
                      buttonStyle={{width: 100, backgroundColor: '#0b8b00ff', borderRadius: 10, borderWidth: 2, borderColor: '#0b8b00ff'}}
                      onPress={() => this.removeItem(this.state.itemIndex)}
                    />
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              <Modal
                isVisible={this.state.isModalVisible}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  padding: 22,
                  justifyContent: 'center'
                }}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}>

                <View style={{
                  height: 400,
                  backgroundColor: 'white',
                  borderRadius: 4,
                  padding: 10,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                  <Text style={styles.textinputval}>Item Name</Text>
                  <TextInput
                    underlineColorAndroid="#0b8b00ff"
                    style={styles.textinput}
                    value={this.state.item.name}
                  />
                  <Text style={styles.textinputval}>Quantity</Text>
                  <TextInput
                    underlineColorAndroid="#0b8b00ff"
                    style={styles.textinput}
                    onChangeText={(data) => this.qty(data)}
                    value={this.state.item.qty}
                    keyboardType={'numeric'}
                  />
                  <Text style={styles.textinputval}>Item Category</Text>
                  <TextInput
                    underlineColorAndroid="#0b8b00ff"
                    style={styles.textinput}
                    value={this.state.item.category}
                  />
                  <Text style={styles.textinputval}>Item Price</Text>
                  <TextInput
                    underlineColorAndroid="#0b8b00ff"
                    style={styles.textinput}
                    value={this.state.item.price ? formatRupiah(this.state.item.price) : formatRupiah('0')}
                  />
                  <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>Total Price : {this.state.item.total ? formatRupiah(this.state.item.total) : formatRupiah('0')}</Text>

                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, justifyContent: 'center'}}>
                    <Button
                      title='Cancel'
                      fontWeight="bold"
                      fontSize={16}
                      buttonStyle={{width: 100, backgroundColor: 'red', borderRadius: 10, borderWidth: 2, borderColor: 'red'}}
                      onPress={this._hideModal}
                    />
                    <Button
                      title='Save'
                      fontWeight="bold"
                      fontSize={16}
                      buttonStyle={{width: 100, backgroundColor: '#0b8b00ff', borderRadius: 10, borderWidth: 2, borderColor: '#0b8b00ff'}}
                      onPress={() => this.simpanBelanjaan()}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                isVisible={this.state.isModalVisibleX}
                style={styles.bottomModal}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}>
                <Text style={{textAlign: 'center', paddingBottom: 15, fontSize: 20, fontWeight: 'bold', color: '#0b8b00ff'}}>
                  We have recommendation for you.
                </Text>
                <View>
                  <Text>Should be keep</Text>
                  <List containerStyle={{marginBottom: 20}}>
                    {
                      this.state.suggestionKeep.map((item, i) => (
                        <Card containerStyle={{padding: 0}} >
                          {
                            <ListItem
                              hideChevron={true}
                              key={i}
                              title={item}
                            />
                          }
                        </Card>
                      ))
                    }
                  </List>
                  <Text>Should be removed</Text>
                  <List containerStyle={{marginBottom: 20}}>
                    {
                      this.state.suggestionRemove.map((item, i) => (
                        <Card containerStyle={{padding: 0}} >
                          {
                            <ListItem
                              hideChevron={true}
                              key={i}
                              title={item}
                            />
                          }
                        </Card>
                      ))
                    }
                  </List>
                  <Button
                    title="Ok, Thanks!"
                    fontWeight="bold"
                    fontSize={16}
                    buttonStyle={{backgroundColor: '#0b8b00ff', borderRadius: 10, borderWidth: 2, borderColor: '#0b8b00ff'}}
                    onPress={() => this._hideModalX()}
                  />
                </View>
              </Modal>

            </View>
          </View>
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
    padding: 20
  },

  kontainer: {
    flex: 1,
    flexDirection:'column',
  },

  contentContainer: {
    height: 300,
    // paddingVertical: 50,
    paddingBottom: 10,
  },

  backgroundLoading: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60%',
    backgroundColor: '#0b8b00ff'
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

  textinputval: {
    color: '#0b8b00ff'
  },

  textinput: {
    height: 40,
    width: responsiveWidth(80),
    paddingLeft: 3,
    marginBottom: 10,
    color: 'black',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTransaction: (transaction) => dispatch(postTransactions(transaction))
  }
}

export default connect(null, mapDispatchToProps)(Startshoping)
