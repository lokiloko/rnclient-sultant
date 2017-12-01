import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SectionList} from 'react-native';
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

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    const list = this.props.navigation.state.params.list.items

    return (
      <Image source={{uri: 'https://hdwallsource.com/img/2016/9/cash-money-wallpaper-background-49518-51193-hd-wallpapers.jpg'}}>
      <View style={styles.container}>
        <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, flexDirection: 'row'}}>
        <Container>
        <Content>
          <List containerStyle={{marginBottom: 20}}>
          {
            list.map((item, index) => (
              <ListItem
              roundAvatar
              avatar={{uri:'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg'}}
              key={index}
              title={item.name + " ~ Qty:" + item.qty + " ~ Price:" + item.price}
              />
            ))
          }
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
});
