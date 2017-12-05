import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux'
import {connect} from 'react-redux'
import { history } from './store'
import store from './store/index'

import HomeScreen from './components/Home'
import Inputbudget from './components/Inputbudget'
import Currentballance from './components/Currentballance'
import Detailtransaksi from './components/Detailtransaksi'
import Startshoping from './components/Startshoping'
import ujicobacamera from './components/ujicobacamera'

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Inputbudget: { screen: Inputbudget },
  Currentballance: { screen: Currentballance },
  Detailtransaksi: { screen: Detailtransaksi },
  Startshoping: { screen: Startshoping },
  ujicobacamera: { screen: ujicobacamera }
},
{
  headerMode: 'none'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <SimpleApp />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
