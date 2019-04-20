import {
  FETCH_CONTENT,
  FETCH_CONTENT_CLEAR,
  FETCH_CONTENT_SUCCESS
} from "../constants";

const initialState = {
  data: [],
  hasContent:false,
  isFetching: false,
  status: "visitor"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT: //unlogin yet
      return { ...state, isFetching: true, hasContent: false };
    case FETCH_CONTENT_SUCCESS: //logined
      return {
        ...state,
        isFetching: false,
        hasContent: true,
        data: action.payload
      };
    case FETCH_CONTENT_CLEAR:
      return initialState;
    default:
      return state;
  }
};
