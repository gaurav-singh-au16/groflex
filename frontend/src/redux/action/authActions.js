export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });


export const checkAuthentication = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    }
  };
};
