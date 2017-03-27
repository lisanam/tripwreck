import {
  SEARCH_INPUT_CHANGE,
  SEARCH_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = {
  searchInput: '',
  searchResults: []
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return { ...state, searchInput: action.payload };
    case SEARCH_RESTAURANT:
      return { ...state, searchResults: action.payload.data };
    default:
      return state;
  }
};
