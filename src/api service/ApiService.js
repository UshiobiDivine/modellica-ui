/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
import axios from 'axios';

import {
  API_BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../constants/AppConstants';

export const headers = {
  headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
};

export function login(loginRequest) {
  return axios.post(`${API_BASE_URL}/api/auth/login`, loginRequest);
}

export function signup(signupRequest) {
  return axios.post(`${API_BASE_URL}/api/auth/signup`, signupRequest);
}

export function getUser() {
  // if (!localStorage.getItem(ACCESS_TOKEN)) {
  //   return Promise.reject('No access token set.');
  // }
  return axios.get(`${API_BASE_URL}/api/user`, headers);
}
