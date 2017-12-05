import React from 'react';
import { connect } from 'react-redux'
import {
  AsyncStorage,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SectionList,
  Animated,
  Easing
} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
import { List, ListItem, CheckBox, Button as ButtonY } from 'react-native-elements';
import Modal from 'react-native-modal'

// import { TextField } from 'react-native-material-textfield';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { getTransactions } from '../actions'
import formatRupiah from '../helpers/formatRupiah'


class Currentballance extends React.Component {
  static navigationOptions = {
    title: 'Current Ballance',
  };

  constructor(props) {
    super(props)
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      text: '',
      budgetAwal: '',
      budgetSementara: '',
      isModalVisible: false,
      isModalVisibleFirstBudget: false,
      FoodMealSolutionsGrainsPastaGrainsRice: false,
      FoodMealSolutionsGrainsPastaPastaNoodles: false,
      FoodBeveragesPowderedDrinksMixes: false,
      HomeBathShowerCurtains: false,
      PersonalCareBathBodyBodyWashCleansers: false,
      FoodBeveragesSoftDrinks: false,
      PetsDogsDogFood: false,
      BabyDiaperingDiapersDisposableDiapers: false,
      FoodFreshFoodDairyEggsCheeseMilkCream: false,
      HomeImprovementHardwareDoorHardwareDoorHinges: false,
      FoodBakingOilShortening: false,
      AutoTiresOilsandFluidsMotorOil: false,
      FoodBreakfastCerealOatmealHotCereal: false,
      isLoading: false
    }
  }

  async componentWillMount () {
    this.setState({
      isLoading: true
    })

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    AsyncStorage.getItem('iduser').then((data) => {
      if (data) {
        // console.log(data);
        this.props.fetchTransactions(data)
      }
    }).catch((reason) => {
      console.log(reason);
    })

    AsyncStorage.getItem('budget').then((data) => {
      if (data) {
        this.state.budgetAwal = data
      } else {
        this._showModalFirstBudget()
      }

      this.setState({
        isLoading: false
      })
      // console.log('datauang', this.state.budgetAwal)
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

  simpanBudget () {
    if (this.state.text) {
      AsyncStorage.setItem('budget', this.state.text)
      this.setState({
        budgetAwal: this.state.text
      })

      this._hideModalFirstBudget()
    } else {
      alert('Budget Cannot null')
    }
  }

  tambah (inputan) {
    this.setState({budgetSementara: Number(inputan)})
  }

  tambahbudget () {
    let tambah = Number(this.state.budgetSementara) + Number(this.state.budgetAwal)
    let konfString = tambah.toString()
    // this.setState({budgetSementara: konfString})
    // console.log('halo', typeof konfString);
    AsyncStorage.setItem('budget', konfString);
    this.setState({
      budgetSementara: '',
      budgetAwal: konfString
    })
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _showModalFirstBudget = () => this.setState({ isModalVisibleFirstBudget: true })

  _hideModal = () => this.setState({ isModalVisible: false })
  _hideModalFirstBudget = () => this.setState({ isModalVisibleFirstBudget: false })

  navigasiStartShoping () {
    let priority = []

    if(this.state.FoodMealSolutionsGrainsPastaGrainsRice) {
      priority.push("Food/Meal Solutions, Grains & Pasta/Grains & Rice")
    }
    if(this.state.FoodMealSolutionsGrainsPastaPastaNoodles){
      priority.push("Food/Meal Solutions, Grains & Pasta/Pasta & Noodles")
    }
    if(this.state.FoodBeveragesPowderedDrinksMixes) {
      priority.push("Food/Beverages/Powdered Drinks & Mixes")
    }
    if(this.state.HomeBathShowerCurtains) {
      priority.push("Home/Bath/Shower Curtains")
    }
    if(this.state.PersonalCareBathBodyBodyWashCleansers) {
      priority.push("Personal Care/Bath & Body/Body Wash & Cleansers")
    }
    if(this.state.FoodBeveragesSoftDrinks) {
      priority.push("Food/Beverages/Soft Drinks")
    }
    if(this.state.PetsDogsDogFood) {
      priority.push("Pets/Dogs/Dog Food")
    }
    if(this.state.BabyDiaperingDiapersDisposableDiapers) {
      priority.push("Baby/Diapering/Diapers/Disposable Diapers")
    }
    if(this.state.FoodFreshFoodDairyEggsCheeseMilkCream) {
      priority.push("Food/Fresh Food/Dairy, Eggs & Cheese/Milk & Cream")
    }
    if(this.state.HomeImprovementHardwareDoorHardwareDoorHinges){
      priority.push("Home Improvement/Hardware/Door Hardware/Door Hinges")
    }
    if(this.state.FoodBakingOilShortening) {
      priority.push("Food/Baking/Oil & Shortening")
    }
    if(this.state.AutoTiresOilsandFluidsMotorOil) {
      priority.push("Auto & Tires/Oils and Fluids/Motor Oil")
    }
    if(this.state.FoodBreakfastCerealOatmealHotCereal) {
      priority.push("Food/Breakfast & Cereal/Oatmeal & Hot Cereal",)
    }
    this._hideModal()
    this.props.navigation.navigate('Startshoping', {priority:priority})
  }

  ganticheck (masukan) {
    console.log(masukan);
  }

  render() {
    // console.log(this.state.budgetSementara);
    const { navigate } = this.props.navigation;
    // const lists = this.props.transactionList
    const lists = [{
        "_id": "5a1ea9eb2675070002911df3",
        "totalPrice": 100000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "nama barang",
                "qty": 1,
                "category": "food",
                "price": 10000,
                "_id": "5a1ea9eb2675070002911df4"
            }
        ],
        "date": "2017-11-29T12:36:59.486Z"
    },
    {
        "_id": "5a1f86cfe5627900027256ef",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a1f86cfe5627900027256f1"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a1f86cfe5627900027256f0"
            }
        ],
        "date": "2017-11-30T04:19:27.012Z"
    },
    {
        "_id": "5a2120f669ac9300024c7706",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a2120f669ac9300024c7708"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a2120f669ac9300024c7707"
            }
        ],
        "date": "2017-12-01T09:29:26.159Z"
    },
    {
        "_id": "5a22f022358a040002cc6bff",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a22f022358a040002cc6c01"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a22f022358a040002cc6c00"
            }
        ],
        "date": "2017-12-02T18:25:38.955Z"
    },
    {
        "_id": "5a22f2c1358a040002cc6c11",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a22f2c1358a040002cc6c13"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a22f2c1358a040002cc6c12"
            }
        ],
        "date": "2017-12-02T18:36:49.156Z"
    },
    {
        "_id": "5a22f5f2358a040002cc6c1f",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a22f5f2358a040002cc6c21"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a22f5f2358a040002cc6c20"
            }
        ],
        "date": "2017-12-02T18:50:26.158Z"
    },
    {
        "_id": "5a22f8b8358a040002cc6c46",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a22f8b8358a040002cc6c48"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a22f8b8358a040002cc6c47"
            }
        ],
        "date": "2017-12-02T19:02:16.756Z"
    },
    {
        "_id": "5a235a49358a040002cc6c70",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a235a49358a040002cc6c72"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a235a49358a040002cc6c71"
            }
        ],
        "date": "2017-12-03T01:58:33.856Z"
    },
    {
        "_id": "5a24c4ff358a040002cc6cf5",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a24c4ff358a040002cc6cf7"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a24c4ff358a040002cc6cf6"
            }
        ],
        "date": "2017-12-04T03:46:07.956Z"
    },
    {
        "_id": "5a24d124358a040002cc6d1f",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a24d124358a040002cc6d21"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a24d124358a040002cc6d20"
            }
        ],
        "date": "2017-12-04T04:37:56.920Z"
    },
    {
        "_id": "5a24f8b5358a040002cc6d7a",
        "totalPrice": 150000,
        "user": "5a1e8b34261a720002687e06",
        "__v": 0,
        "items": [
            {
                "name": "susu",
                "category": "drink",
                "qty": 1,
                "price": 100000,
                "_id": "5a24f8b5358a040002cc6d7c"
            },
            {
                "name": "popok",
                "category": "kids",
                "qty": 1,
                "price": 50000,
                "_id": "5a24f8b5358a040002cc6d7b"
            }
        ],
        "date": "2017-12-04T07:26:45.430Z"
    }]
    const imguri = 'http://images.all-free-download.com/images/graphiclarge/green_shopping_cart_icon_vector_280755.jpg'

    if (this.state.isLoading) {
      const RotateData = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
      return (
        <View style={styles.backgroundLoading}>
          <Animated.Image
            style={[styles.imageLoading,
              {
                transform: [{
                  rotate: RotateData
                }]
              }
            ]}
            source={require('./sultant.png')}
          />
          <Text style={{color: 'white'}}>Proccessing, please wait...</Text>
        </View>
      )
    } else {
      return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#0b8b00ff'}}>
              <Image
                style={styles.imageLogo}
                source={require('./sultant_header.png')}
              />
            </View>

            <View style={{backgroundColor: 'white', paddingLeft: 30, paddingRight: 30, paddingTop: 10, width: '100%'}}>
              <View style={{flexDirection: 'row', paddingTop: 2}}>
                <Text style={styles.infobudget}>Current Budget : <Text style={{color: 'red'}}>{formatRupiah(this.state.budgetAwal)}</Text></Text>
              </View>

              <View style={{marginTop: 10, paddingBottom: 20}}>
                <TextInput
                  underlineColorAndroid="#0b8b00ff"
                  placeholder="Input here.. (use - to decrease your budget)"
                  keyboardType={"numeric"}
                  style={styles.textinput}
                  onChangeText={(tambahbudget) => this.tambah(tambahbudget)}
                  value={this.state.budgetSementara}
                />

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <ButtonY
                    onPress={() => this.tambahbudget()}
                    title="Add Budget"
                    color="#0b8b00ff"
                    buttonStyle={{borderWidth: 2, borderColor: '#0b8b00ff', borderRadius: 40, backgroundColor: 'white'}}
                  />

                  <ButtonY
                    onPress={() => this._showModal()}
                    title="Start Shoping"
                    color="white"
                    buttonStyle={{borderWidth: 2, borderColor: '#0b8b00ff', borderRadius: 40, backgroundColor: '#0b8b00ff'}}
                  />
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Container>
                  <Content>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <List containerStyle={{marginBottom: 20}}>
                        { lists.length != 0 ?
                          lists.reverse().map((list, index) => (
                            <TouchableOpacity key={ index } onPress={() => navigate('Detailtransaksi', { list })}>
                              <ListItem
                                roundAvatar
                                avatar={{uri: imguri}}
                                title={list.date.slice(0, 10) + " Total belanja Rp" + list.totalPrice}
                              />
                            </TouchableOpacity>
                          ))
                        : <Text style={{alignSelf: 'center', marginTop: 10}}>No Transaction Yet</Text> }
                        </List>
                    </ScrollView>
                  </Content>
                </Container>
              </View>
            </View>

            <Modal
            isVisible={this.state.isModalVisibleFirstBudget}
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
                height: 200,
                backgroundColor: 'white',
                borderRadius: 4,
                padding: 10,
                borderColor: 'rgba(0, 0, 0, 0.1)',
              }}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                  <Text style={{color: '#0b8b00ff', marginBottom: 10, alignSelf: 'center'}}>Please input Your Budget</Text>
                  <TextInput
                    style={{textAlign: 'center',  fontSize: 18, height: 40, width: responsiveWidth(80), paddingLeft: 20, paddingRight: 20, marginBottom: 30}}
                    underlineColorAndroid="#0b8b00ff"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    keyboardType={'numeric'}
                  />

                  <ButtonY
                    buttonStyle={{backgroundColor: '#0b8b00ff', borderRadius: 30, padding: 10}}
                    title="Save"
                    color="white"
                    onPress={() => this.simpanBudget()}
                  />
                </View>
              </View>
            </Modal>

            <View>
              <Modal
              isVisible={this.state.isModalVisible}
              style={styles.bottomModal}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              >
              <View>
                <Text style={{textAlign: 'center', paddingBottom: 15, fontSize: 20, fontWeight: 'bold', color: '#0b8b00ff'}}>Silahkan Memilih Categori dari Prioritas Belanja Anda</Text>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                <CheckBox
                  title='Food/Breakfast & Cereal/Oatmeal & Hot Cereal'
                  checked={this.state.FoodBreakfastCerealOatmealHotCereal}
                  onPress={() => {
                    this.setState({FoodBreakfastCerealOatmealHotCereal: !this.state.FoodBreakfastCerealOatmealHotCereal})
                    this.ganticheck('Food/Breakfast & Cereal/Oatmeal & Hot Cereal')
                  }}
                />
                <CheckBox
                  title='Food/Meal Solutions, Grains & Pasta/Grains & Rice'
                  checked={this.state.FoodMealSolutionsGrainsPastaGrainsRice}
                  onPress={() => this.setState({FoodMealSolutionsGrainsPastaGrainsRice: !this.state.FoodMealSolutionsGrainsPastaGrainsRice})}
                />
                <CheckBox
                  title='Food/Meal Solutions, Grains & Pasta/Pasta & Noodles'
                  checked={this.state.FoodMealSolutionsGrainsPastaPastaNoodles}
                  onPress={() => this.setState({FoodMealSolutionsGrainsPastaPastaNoodles: !this.state.FoodMealSolutionsGrainsPastaPastaNoodles})}
                />
                <CheckBox
                  title='Food/Beverages/Powdered Drinks & Mixes'
                  checked={this.state.FoodBeveragesPowderedDrinksMixes}
                  onPress={() => this.setState({FoodBeveragesPowderedDrinksMixes: !this.state.FoodBeveragesPowderedDrinksMixes})}
                />
                <CheckBox
                  title='Home/Bath/Shower Curtains'
                  checked={this.state.HomeBathShowerCurtains}
                  onPress={() => this.setState({HomeBathShowerCurtains: !this.state.HomeBathShowerCurtains})}
                />
                <CheckBox
                  title='Personal Care/Bath & Body/Body Wash & Cleansers'
                  checked={this.state.PersonalCareBathBodyBodyWashCleansers}
                  onPress={() => this.setState({PersonalCareBathBodyBodyWashCleansers: !this.state.PersonalCareBathBodyBodyWashCleansers})}
                />
                <CheckBox
                  title='Food/Beverages/Soft Drinks'
                  checked={this.state.FoodBeveragesSoftDrinks}
                  onPress={() => this.setState({FoodBeveragesSoftDrinks: !this.state.FoodBeveragesSoftDrinks})}
                />
                <CheckBox
                  title='Pets/Dogs/Dog Food'
                  checked={this.state.PetsDogsDogFood}
                  onPress={() => this.setState({PetsDogsDogFood: !this.state.PetsDogsDogFood})}
                />
                <CheckBox
                  title='Baby/Diapering/Diapers/Disposable Diapers'
                  checked={this.state.BabyDiaperingDiapersDisposableDiapers}
                  onPress={() => this.setState({BabyDiaperingDiapersDisposableDiapers: !this.state.BabyDiaperingDiapersDisposableDiapers})}
                />
                <CheckBox
                  title='Food/Fresh Food/Dairy, Eggs & Cheese/Milk & Cream'
                  checked={this.state.FoodFreshFoodDairyEggsCheeseMilkCream}
                  onPress={() => this.setState({FoodFreshFoodDairyEggsCheeseMilkCream: !this.state.FoodFreshFoodDairyEggsCheeseMilkCream})}
                />
                <CheckBox
                  title='Home Improvement/Hardware/Door Hardware/Door Hinges'
                  checked={this.state.HomeImprovementHardwareDoorHardwareDoorHinges}
                  onPress={() => this.setState({HomeImprovementHardwareDoorHardwareDoorHinges: !this.state.HomeImprovementHardwareDoorHardwareDoorHinges})}
                />
                <CheckBox
                  title='Food/Baking/Oil & Shortening'
                  checked={this.state.FoodBakingOilShortening}
                  onPress={() => this.setState({FoodBakingOilShortening: !this.state.FoodBakingOilShortening})}
                />
                <CheckBox
                  title='Auto & Tires/Oils and Fluids/Motor Oil'
                  checked={this.state.AutoTiresOilsandFluidsMotorOil}
                  onPress={() => this.setState({AutoTiresOilsandFluidsMotorOil: !this.state.AutoTiresOilsandFluidsMotorOil})}
                />

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <View style={{paddingTop: 10, marginRight: 5}}>
                  <ButtonY
                    style={{marginRight: 15, paddingLeft: 20, paddingRight: 20}}
                    onPress={this._hideModal}
                    title="Cancel"
                    color="red"
                  />
                </View>

                <View style={{paddingTop: 10, marginLeft: 5}}>
                  <ButtonY
                    style={{marginLeft: 15, paddingLeft: 20, paddingRight: 20}}
                    onPress={() => this.navigasiStartShoping()}
                    title="Save"
                    color="#0b8b00ff"
                  />
                </View>
              </View>

              </ScrollView>
              </View>
              </Modal>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: "#0b8b00ff"
  },

  imageLogo: {
    width: 200,
    height: 80,
    resizeMode: Image.resizeMode.contain
  },

  appName: {
    paddingRight: 30,
    paddingTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  infobudget: {
    paddingTop: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  textinput: {
   height: 40,
   width: responsiveWidth(80),
   paddingLeft: 3,
   marginBottom: 10
  },

  bottomModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  contentContainer: {
    paddingBottom: 250
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

  imageLoading: {
    width: 100,
    height: 100,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 20
  },
});

const mapStateToProps = (state) => {
  return {
    transactionList: state.transactionsReducer.transactions
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: (userid) => dispatch(getTransactions(userid))
})

// export default Currentballance
export default connect(mapStateToProps, mapDispatchToProps)(Currentballance)
