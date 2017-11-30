import { combineReducers } from 'redux';

const news = {
  allnews: []
}

const newsReducers = (state = news, action) => {
  switch (action.type) {
    case 'DAPAT_BERITA':
      return {...state, allnews:action.value}
    default:
      return state;
  }
};

export default combineReducers({
  allnews: newsReducers
});
