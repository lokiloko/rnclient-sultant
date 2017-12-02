import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'

export default class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home Native API'
  // };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image source={{uri: 'https://hdwallsource.com/img/2016/9/cash-money-wallpaper-background-49518-51193-hd-wallpapers.jpg'}}>
      <View style={styles.container}>
      <Text style={styles.appName}>SULTANT</Text>
      <View>

        <Image
          style={styles.imageLogo}
          source={require('./sultant.png')}
        />

      </View>

      <View>
      <TouchableOpacity onPress={() => navigate('Inputbudget')}>
        <Image
            style={styles.imageLogin}
            source={{uri: 'http://qsmart.co/Images/fb.png'}}
          />
      </TouchableOpacity>
      </View>
      </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  imageLogo: {
    width: 300,
    height: 300,
    resizeMode: Image.resizeMode.contain,
  },
  imageLogin: {
    width: 200,
    height: 200,
    resizeMode: Image.resizeMode.contain
  },
  appName: {
    paddingTop: 70,
    paddingBottom: 50,
    fontSize: 20,
  },
  HomeScreen: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
