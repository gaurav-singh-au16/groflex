// authReducer.js

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Save the token to localStorage
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
