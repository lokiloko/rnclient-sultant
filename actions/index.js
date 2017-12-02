import axios from 'axios'

export const dapatkanBeritaLengkap = (value) => {
  return {
    type: 'DAPAT_BERITA',
    value
  }
};

export const setTransactions = (transactionData) => {
  return {
    type: 'TRANSACTION_LIST',
    payload: transactionData
  }
}

export const dapatkanBerita = () => {
  return (dispatch) => {
    return axios.get('https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=080e457774e54e00b8fd9315ed37c24d')
    .then(function (response) {
      const dataApi = response.data.articles
      dispatch(dapatkanBeritaLengkap(dataApi))
    })
    .catch(function (error) {
      console.log(error);
    })
  };
};

export const getTransactions = () => {
  return (dispatch) => {
    axios.get('https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD')
    .then(({data}) => {
      // console.log(data);
      return dispatch(setTransactions(data))
    })
    .catch((reason) => {
      console.log(reason);
    })
  }
}
