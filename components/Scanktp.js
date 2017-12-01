import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import axios from 'axios'
import { postUser } from '../actions/index'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {connect} from 'react-redux'

class Scanktp extends React.Component {
  // static navigationOptions = {
  //   title: 'Home Native API'
  // };

  constructor(props) {
    super(props)
    this.state = {
      nik: 0,
      nama: '',
      pekerjaan: '',
      provinsi: '',
      kota: '',
    }
  }

  componentWillMount () {
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image source={{uri: 'https://i.pinimg.com/originals/9a/d0/3d/9ad03d1be00db96fe779b55c7dbc0e95.jpg'}} style={styles.backgroundImage}>
      <View style={styles.container}>
      </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});

const mapState = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // postUser: (object) => dispatch(postUser(object)),
  }
}

const Scan = connect(
  mapState,
  mapDispatchToProps
)(Scanktp)

export default Scan;
