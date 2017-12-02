import React from 'react';
import { connect } from 'react-redux'
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SectionList} from 'react-native';
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
      text: 'aman'
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  render() {
    const { navigate } = this.props.navigation;
    const lists = this.props.transactionList
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

        <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, flexDirection: 'row'}}>
        <Container>
        <Content>
          <Button block success rounded
          onPress={() => navigate('Startshoping')}>
            <Text>Start Shoping</Text>
          </Button>

          <List containerStyle={{marginBottom: 20}}>
          { lists ?
            lists.map((list, index) => (
              <TouchableOpacity key={ index } onPress={() => navigate('Detailtransaksi', { list })}>
                <ListItem
                  roundAvatar
                  avatar={{uri:'https://i1.sndcdn.com/artworks-000066312689-d7quy2-t500x500.jpg'}}
                  title={list.date.slice(0, 10) + " ~~~ Rp" + list.totalPrice}
                />
              </TouchableOpacity>
            ))
          : <Text>loading..</Text> }
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
    resizeMode: Image.resizeMode.contain,
  },
  appName: {
    paddingRight: 30,
    paddingTop: 20,
    fontSize: 20,
    alignSelf: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    transactionList: state.transactionsReducer.transactions
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: () => dispatch(getTransactions())
})

// export default Currentballance
export default connect(mapStateToProps, mapDispatchToProps)(Currentballance)
