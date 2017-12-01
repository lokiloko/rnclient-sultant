import { combineReducers } from 'redux';

const news = {
  dataUser: []
}

const userReducers = (state = news, action) => {
  // console.log('manamih', action.value._id)
  // alert(action.value.dataUser)
  switch (action.type) {
    case 'DATA_SCAN_KTP':
      // console.log('action=>', action.value)
      return {...state, dataUser: action.value}
    default:
      return state;
  }
};

export default combineReducers({
  dataUser: userReducers
});
