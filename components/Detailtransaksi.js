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
    const list = this.props.navigation.state.params.list.items

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
                avatar={{uri:'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg'}}
                key={index}
                title={item.name + " Price: " + item.price + " ("+item.qty+")"}
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
