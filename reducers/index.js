import { combineReducers } from 'redux';

const news = {
  allnews: []
}

const transactionsDefaultState = {
  transactions: []
}

const newsReducers = (state = news, action) => {
  switch (action.type) {
    case 'DAPAT_BERITA':
      return {...state, allnews:action.value}
    default:
      return state;
  }
};

const transactionsReducer = (state = transactionsDefaultState, action) => {
  if (action.type && action.type === "TRANSACTION_LIST") {
    return {...state, transactions: action.payload}
  }

  return state
}

export default combineReducers({
  allnews: newsReducers,
  transactionsReducer
});
