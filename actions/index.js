import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const dapatkanHasilScaKtp = (value) => {
  return {
    type: 'DATA_SCAN_KTP',
    value
  }
};

export const setBudget = (budget) => {
  return {
    type: 'USER_BUDGET',
    payload: budget
  }
}

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

export const getTransactions = (userid) => {
  return (dispatch) => {
    axios.get(`https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD?action=user&id=${userid}`)
    .then(({data}) => {
      return dispatch(setTransactions(data))
    })
    .catch((reason) => {
      console.log(reason);
    })
  }
}

export const postTransactions = (transaction) => {
  return (dispatch) => {
    axios.post(`https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD`, transaction)
    .then(({data}) => {
      console.log(data);

      return dispatch(getTransactions(data.user))
    })
    .catch((reason) => {
      console.log(reason);
    })
  }
}
