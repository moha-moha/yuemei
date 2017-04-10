import { login, userInfo, logout } from '../services/app'
import { parse } from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    user: {
      name: 'Moha',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
    permissions: {
      dashboard: {
        text: '用户大盘',
        route: 'dashboard',
      },
      users: {
        text: '用户管理',
        route: 'users',
      },
      UIElement: {
        text: 'UI Element',
        route: 'UIElement',
      },
      UIElementIconfont: {
        text: 'Iconfont',
        route: 'UIElement/iconfont',
        parent: 'UIElement',
      },
      chart: {
        text: 'Rechart',
        route: 'chart',
      },
    },
    userPermissions: [],
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' })
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
    },
  },
  effects: {
    *login ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const { success, userPermissions, username } = yield call(login, parse(payload))
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userPermissions,
            user: {
              name: username,
            },
          } })
      } else {
        yield put({
          type: 'loginFail',
        })
      }
    },
    *queryUser ({
      payload,
    }, { call, put }) {
      const { success, userPermissions, username } = yield call(userInfo, parse(payload))
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userPermissions,
            user: {
              name: username,
            },
          },
        })
      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({
          type: 'logoutSuccess',
        })
      }
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
