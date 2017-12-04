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
} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
import { List, ListItem, Button as Buttonx, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal'

// import { TextField } from 'react-native-material-textfield';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { getTransactions } from '../actions'



class Currentballance extends React.Component {
  static navigationOptions = {
    title: 'Current Ballance',
  };

  constructor(props) {
    super(props)
    this.state = {
      text: 'aman',
      budgetAwal: '',
      budgetSementara: '',
      isModalVisible: false,
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
    }
  }

  async componentWillMount () {
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
      this.state.budgetAwal = data
      console.log('datauang', this.state.budgetAwal)
    }).catch((reason) => {
      console.log(reason);
    })
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

  _hideModal = () => this.setState({ isModalVisible: false })

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
    const lists = this.props.transactionList
    const imguri = 'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/24129614_10210614123930346_4311928442133126805_n.jpg?_nc_eui2=v1%3AAeFmBr5_jAksHWATxU71fb1aoyFlUXlYwgk9uS3xGS22niluU6JAORQmnNPx7kDgYZSlg74KhzlOddsaygN1AmLWlzk_Hovz8kgCr55G01s7tQ&oh=a77e1a0c9437286b040cce8aa155e9fb&oe=5A9748F6'

    return (
      <Image source={{uri: 'https://hdwallsource.com/img/2016/9/cash-money-wallpaper-background-49518-51193-hd-wallpapers.jpg'}}>
        <View style={styles.container}>

          <View style={{flexDirection: 'row', paddingTop: 20}}>
            <View style={{paddingLeft: 30}}>
              <Image
                style={styles.imageLogo}
                source={require('./sultant.png')}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.appName}>SULTANT</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', paddingTop: 2}}>
            <Text style={styles.infobudget}>Sisa uang kamu: {this.state.budgetAwal}</Text>
          </View>

          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <TextInput
            keyboardType={"numeric"}
            style={styles.textinput}
            onChangeText={(tambahbudget) => this.tambah(tambahbudget)}
            value={this.state.budgetSementara}
            />
          </View>

          <View style={{paddingTop: 0, paddingLeft: 30, paddingRight: 30, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.tambahbudget()}>
            <Text style={styles.infobudget}>Tambah Budget</Text>
          </TouchableOpacity>
          </View>

          <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, flexDirection: 'row'}}>
            <Container>
              <Content>
                <Button block success rounded
                  onPress={() => this._showModal()}>
                  <Text>Start Shoping</Text>
                </Button>

                <List containerStyle={{marginBottom: 20}}>
                { lists.length != 0 ?
                  lists.reverse().map((list, index) => (
                    <TouchableOpacity key={ index } onPress={() => navigate('Detailtransaksi', { list })}>
                      <ListItem
                        roundAvatar
                        avatar={{uri: imguri}}
                        title={list.date.slice(0, 10) + " ~~~ Rp" + list.totalPrice}
                      />
                    </TouchableOpacity>
                  ))
                : <Text>No Transaction Yet</Text> }
                </List>

              </Content>
            </Container>
          </View>
          <View>
            <Modal
            isVisible={this.state.isModalVisible}
            style={styles.bottomModal}
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            >
            <View>
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

            <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, alignItems: 'center',}}>

              <View style={{}}>
                <Buttonx
                title='Cancel'
                buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                onPress={this._hideModal}
                />
              </View>
              <View style={{}}>
                <Buttonx
                title='Save'
                buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                onPress={() => this.navigasiStartShoping()}
                />
              </View>

            </View>

            </ScrollView>
            </View>
            </Modal>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageLogo: {
    width: 50,
    height: 50,
    resizeMode: Image.resizeMode.contain
  },
  appName: {
    paddingRight: 30,
    paddingTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },
  infobudget: {
    paddingTop: 20,
    fontSize: 15,
    color: 'white'
  },
  textinputval: {
   color: '#ffffff'
  },
  textinput: {
   height: 40,
   width: responsiveWidth(80),
   borderColor: 'white',
   borderWidth: 2,
   paddingTop: 10,
   paddingLeft: 20,
   paddingRight: 20,
   color: '#ffffff',
  },
  bottomModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
