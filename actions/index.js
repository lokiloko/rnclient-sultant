import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const dapatkanHasilScaKtp = (value) => {
  return {
    type: 'DATA_SCAN_KTP',
    value
  }
};

export const setTransactions = (transactionData) => {
  return {
    type: 'TRANSACTION_LIST',
    payload: transactionData
  }
}

export const postUser = (data) => {
  return (dispatch) => {(
    axios.post('https://us-central1-ian-hacktiv8.cloudfunctions.net/usersCRUD', data)
    .then(({data}) => {
      AsyncStorage.setItem('iduser', data.data._id);

      const dataUsr = data.data

      return dispatch(dapatkanHasilScaKtp(dataUsr))
    })
    .catch((error) => {
      console.log(error);
    })
  )}
};

export const getTransactions = () => {
  return (dispatch) => {
    axios.get('https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD')
    .then(({data}) => {
      return dispatch(setTransactions(data))
    })
    .catch((reason) => {
      console.log(reason);
    })
  }
}
