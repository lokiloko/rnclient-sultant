import axios from 'axios'
import { AsyncStorage } from 'react-native';
// import { StackNavigator } from 'react-navigation';

export const dapatkanHasilScaKtp = (value) => {
  return {
    type: 'DATA_SCAN_KTP',
    value
  }
}

export const postUser = (data) => {
  return (dispatch) => {(
    axios.post('https://us-central1-ian-hacktiv8.cloudfunctions.net/usersCRUD', data)
    .then(({data}) => {
      // this.props.navigation.navigate('Home')
      // console.log(data.data._id)
      // AsyncStorage.setItem('iduser', data.data._id);
      // const dataUsr = data.data
      // return dispatch(dapatkanHasilScaKtp(dataUsr))
    })
    .catch((error) => {
      // this.props.navigation.navigate('Home')
      // AsyncStorage.setItem('name', 'persuasive');
      console.log(error);
    })
  )}
};

// export const getUserAfter = (data) => {
//   return (dispatch) => {(
//
//   )}
// }

// export const scanKtpUser = (data) => {
//   return (dispatch) => {
//     return dispatch(dapatkanHasilScaKtp({}))
//   }
// }
