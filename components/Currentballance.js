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
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
import { List, ListItem } from 'react-native-elements';
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
                onPress={() => navigate('Startshoping')}>
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
