import React from 'react';
import {
  AsyncStorage,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SectionList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
import { List, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal'

import { Container, Header, Content, Form, Item, Input, Label, Button, Icon} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Detailtransaksi extends React.Component {
  static navigationOptions = {
    title: 'Detail Transaksi',
  };

  constructor() {
    super()
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    const dataMentah = this.props.navigation.state.params.list.items
    // console.log(dataMentah);
    const list = []

    for (var i = 0; i < dataMentah.length; i++) {
      if (dataMentah[i].category == "Food/Meal Solutions, Grains & Pasta/Grains & Rice") {
        dataMentah[i].avatar = 'http://ciat.cgiar.org/wp-content/uploads/2016/07/RICE-icon.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Meal Solutions, Grains & Pasta/Pasta & Noodles') {
        dataMentah[i].avatar = 'https://d30y9cdsu7xlg0.cloudfront.net/png/82812-200.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Beverages/Powdered Drinks & Mixes') {
        dataMentah[i].avatar = 'http://icons.veryicon.com/png/System/Icons8%20Metro%20Style/Hot%20Beverages%20Tea.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Home/Bath/Shower Curtains') {
        dataMentah[i].avatar = 'https://d30y9cdsu7xlg0.cloudfront.net/png/51-200.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Personal Care/Bath & Body/Body Wash & Cleansers') {
        dataMentah[i].avatar = 'https://d30y9cdsu7xlg0.cloudfront.net/png/26970-200.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Beverages/Soft Drinks') {
        dataMentah[i].avatar = 'https://marketplace.canva.com/MACaIgKSFxQ/1/thumbnail_large/canva-burger-with-soft-drink-icon-MACaIgKSFxQ.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Pets/Dogs/Dog Food') {
        dataMentah[i].avatar = 'http://downloadicons.net/sites/default/files/dog-icon-86451.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Baby/Diapering/Diapers/Disposable Diapers') {
        dataMentah[i].avatar = 'https://d30y9cdsu7xlg0.cloudfront.net/png/75158-200.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Fresh Food/Dairy, Eggs & Cheese/Milk & Cream') {
        dataMentah[i].avatar = 'http://free-icon-rainbow.com/i/icon_05205/icon_052050_256.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Home Improvement/Hardware/Door Hardware/Door Hinges') {
        dataMentah[i].avatar = 'https://www.shareicon.net/data/512x512/2015/10/02/110903_processor_512x512.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Baking/Oil & Shortening') {
        dataMentah[i].avatar = 'https://dtgxwmigmg3gc.cloudfront.net/files/51bacb46c566d724c1018885-icon-256x256.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Auto & Tires/Oils and Fluids/Motor Oil') {
        dataMentah[i].avatar = 'https://www.texasrefinery.com/wp-content/uploads/2015/09/engine-oil-icon-2.png.png'
        list.push(dataMentah[i])
      } else if (dataMentah[i].category == 'Food/Breakfast & Cereal/Oatmeal & Hot Cereal') {
        dataMentah[i].avatar = 'https://cdn3.iconfinder.com/data/icons/breakfast-icons/580/Cereal_Bowl_And_Spoon-512.png'
        list.push(dataMentah[i])
      } else {
        dataMentah[i].avatar = 'https://hacktiv8students.slack.com/files/U6JQ2CW9K/F89V16E2K/logo.png'
        list.push(dataMentah[i])
      }
    }

    return (
          <View style={{paddingTop: 20, paddingLeft: 15, paddingRight: 15, flexDirection: 'row'}}>
          <Container>
            <Content>

              <List containerStyle={{marginBottom: 20}}>
              {
                list.map((item, index) => (
                  <ListItem
                  roundAvatar
                  hideChevron={true}
                  avatar={{uri:item.avatar}}
                  key={index}
                  title={item.name}
                  subtitle={"Rp." + item.price + " ("+item.qty+")"}
                  />
                ))
              }
              </List>
            </Content>
          </Container>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
