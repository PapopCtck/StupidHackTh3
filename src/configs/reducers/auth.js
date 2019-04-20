import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_CLEAR } from "../constants";

const initialState = {
  data: {},
  isAuth: false,
  status: "visitor"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: //unlogin yet
      return { ...state, isAuth: false };
    case FETCH_USER_SUCCESS: //logined
      return {
        ...state,
        isAuth: true,
        data: action.payload,
      };
      case FETCH_USER_CLEAR:
      return initialState
    default:
      return state;
  }
};
