import rest from '@/utils/rest';
import { getToken, setToken, removeToken } from '@/utils/auth';


const state = {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
};

const getters = {
  token: _state => _state.token,
};

const actions = {
  signin({ commit }, payload = {}) {
    let code;
    const usernameTrimed = payload.username.trim();
    const passwordTrimed = payload.password.trim();
    return rest({
      url: '/user/signin/post',
      method: 'post',
      data: {
        username: usernameTrimed,
        password: passwordTrimed,
      },
    }).then((resp) => {
      code = resp.data.code;
      // 成功
      if (code === 200) {
        commit('SET_TOKEN', resp.data.data.token);
      }
      return Promise.resolve(code);
    });
  },
  signup({ commit }, payload = {}) {
    let code;
    const usernameTrimed = payload.username.trim();
    const passwordTrimed = payload.password.trim();
    const emailTrimed = payload.email.trim();
    const phoneNumTrimed = payload.phoneNum.trim();
    return rest({
      url: '/user/signup/post',
      method: 'post',
      data: {
        username: usernameTrimed,
        password: passwordTrimed,
        email: emailTrimed,
        phoneNum: phoneNumTrimed,
      },
    }).then((resp) => {
      code = resp.data.code;
      // 成功
      if (code === 200) {
        commit('SET_TOKEN', resp.data.data.token);
      }
      return Promise.resolve(code);
    });
  },
  signOut({ commit }) {
    return rest({
      url: '/user/signout/post',
      method: 'post',
      // params: {
      //   token: _state.token,
      // },
    }).then((resp) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      return Promise.resolve(resp);
    });
  },
  getUserInfo({ commit }, _state) {
    return rest({
      url: '/user/info/get',
      method: 'get',
      params: {
        token: _state.token,
      },
    }).then((resp) => {
      console.log(resp);
      commit('SET_ROLES', resp.role);
      return Promise.resolve(resp);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  SET_TOKEN: (_state, token) => {
    _state.token = token;
    setToken(token);
  },
  SET_ROLES: (_state, roles) => {
    state.roles = roles;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};