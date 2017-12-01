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
    const list = [
      {
        name: 'Chiki Uenak',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg'
      },
      {
        name: 'Chitatoz',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
      {
        name: 'Keripik Uenak',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
      {
        name: 'Somai Goreng',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
      {
        name: 'Ayam Bawang',
        avatar_url: 'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg',
      },
    ]
    return (
      <Image source={{uri: 'https://hdwallsource.com/img/2016/9/cash-money-wallpaper-background-49518-51193-hd-wallpapers.jpg'}}>
      <View style={styles.container}>
        <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, flexDirection: 'row'}}>
        <Container>
        <Content>
          <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.name}
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
