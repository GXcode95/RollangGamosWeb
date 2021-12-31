import { FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_ERROR } from "./types";

export const fetchPost = () => {
  return {
    type: FETCH_POST
  }
}
export const fetchPostSuccess = (post) => {
  return {
    type: FETCH_POST_SUCCESS,
    post
  }
}
export const fetchPostError = (error) => {
  return {
    type: FETCH_POST_ERROR,
    error
  }
}