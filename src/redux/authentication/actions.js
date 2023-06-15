const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',

  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',
  
  EMAILCONFIRM_BEGIN: 'EMAILCONFIRM_BEGIN',
  EMAILCONFIRM_SUCCESS: 'EMAILCONFIRM_SUCCESS',
  EMAILCONFIRM_ERR: 'EMAILCONFIRM_ERR',

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: (data) => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginErr: (err) => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: (data) => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  logoutErr: (err) => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },

  emailBegin: () => {
    return {
      type: actions.EMAILCONFIRM_BEGIN,
    };
  },

  emailSuccess: (data) => {
    return {
      type: actions.EMAILCONFIRM_SUCCESS,
      data,
    };
  },

  emailErr: (err) => {
    return {
      type: actions.EMAILCONFIRM_ERR,
      err,
    };
  },
};

export default actions;
