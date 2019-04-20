import {
  FETCH_CONTENT,
  FETCH_CONTENT_CLEAR,
  FETCH_CONTENT_SUCCESS
} from "../constants";

const initialState = {
  data: [],
  isFetching: false,
  status: "visitor"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT: //unlogin yet
      return { ...state, isFetching: true };
    case FETCH_CONTENT_SUCCESS: //logined
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FETCH_CONTENT_CLEAR:
      return initialState;
    default:
      return state;
  }
};
