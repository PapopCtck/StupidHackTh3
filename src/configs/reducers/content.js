import {
  FETCH_CONTENT,
  FETCH_CONTENT_CLEAR,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_FEEDS,
  FETCH_CONTENT_SYS
} from "../constants";

const initialState = {
  data: [],
  feeds:[],
  system:{},
  hasContent:false,
  hasFeeds:false,
  hasSys:false,
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
    case FETCH_CONTENT_FEEDS: return {...state,isFetching:false,hasFeeds:true,feeds:action.feeds}
    case FETCH_CONTENT_SYS : return {...state,isFetching:false,hasSys:true ,system:action.system}
    case FETCH_CONTENT_CLEAR:
      return initialState;
    default:
      return state;
  }
};
