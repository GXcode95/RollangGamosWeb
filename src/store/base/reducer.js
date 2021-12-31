import { FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_ERROR } from "./types";

const initialState = {
  loading: false,
  post: {},
  error: ''
}
const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_POST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.post,        
      }
    case FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default: 
      return state;
  }
}

export default postReducer