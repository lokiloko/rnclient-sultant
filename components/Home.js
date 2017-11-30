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
      <View style={styles.container}>
      <Text style={styles.appName}>SULTANT</Text>
      <View>
      <TouchableOpacity onPress={() => navigate('Inputbudget')}>
        <Image
          style={styles.imageLogo}
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png'}}
        />
      </TouchableOpacity>
      </View>

      <View>
        <Image
            style={styles.imageLogin}
            source={{uri: 'http://qsmart.co/Images/fb.png'}}
          />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    fontSize: 20,
  }
});
