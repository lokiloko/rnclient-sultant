import { combineReducers } from 'redux';

const user = {
  dataUser: {},
  budget: 0
}

const transactionsDefaultState = {
  transactions: []
}

const userReducers = (state = user, action) => {
  switch (action.type) {
    case 'DATA_SCAN_KTP':
      return {...state, dataUser: action.value}
    case 'USER_BUDGET':
      return {...state, budget: action.payload}
    default:
      return state;
  }
}

const transactionsReducer = (state = transactionsDefaultState, action) => {
  if (action.type && action.type === "TRANSACTION_LIST") {
    return {...state, transactions: action.payload}
  }

  return state
}

export default combineReducers({
  userReducers,
  transactionsReducer
});
