import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity} from 'react-native';
import axios from 'axios'

import { StackNavigator } from 'react-navigation';

import Lihat from './components/Lihat'


export default class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props)
    this.state = {
      dataApi: []
    }
  }

  componentWillMount () {
    let self = this
    axios.get('https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=080e457774e54e00b8fd9315ed37c24d')
    .then(function (response) {
      const dataApi = response.data.articles
      self.setState({dataApi})
      console.log(self.state.dataApi)
    })
    .catch(function (error) {
      console.log(error);
    })
    console.log('bisa karna biasa', self.state.dataApi)
  }


  render() {
    // const { navigate } = this.props.navigation;
    alert(this.props.navigation)
    return (
      <View style={styles.container}>


       <ScrollView contentContainerStyle={styles.contentContainer}>

        {this.state.dataApi.map((data, key) => {
          return (

            <View style={[styles.pembungkus]} key={key}>
              <View style={[styles.kontainer]}>
                <TouchableOpacity onPress={() => navigate('Lihat', {name: item.name})}><Text style={[styles.judul]}>{data.title}</Text></TouchableOpacity>
                <Text style={[styles.description]}>{data.description}</Text>
              </View>

              <View style={[styles.kontainer]}>
                <Image source={{uri: data.urlToImage}} style={{width: 150, height: 100}} />
              </View>
            </View>

          )
        })}

         </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 50,
  },
  pembungkus: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  kontainer: {
    flex: 1,
    flexDirection:'column',
  },
});

export const myScreens = StackNavigator({
  Home: {screen: App},
  Lihat: {screen: Lihat}
})

AppRegistry.registerComponent('Aplikasi', () => myScreens);
