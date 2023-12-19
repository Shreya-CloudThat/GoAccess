// AuthContext.js
import { createContext, useContext, useEffect, useReducer } from 'react';
import { callApiForUserDetails } from '../custom-components/GetUserByEmail';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
      break;
    case 'SIGN_OUT':
      console.log('Sign out');
      localStorage.removeItem('user');
      localStorage.removeItem('access');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
      break;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('state', state);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state?.user));
    // console.log("user")
    try {
      // console.log(state?.user?.username);
      if (state?.user !== null) {
        callApiForUserDetails(state?.user?.username).then((res) =>
          localStorage.setItem('access', JSON.stringify(res))
        );
      }

      // callApiForUserDetails(state?.user?.username).then((resp) => {
      // localStorage.setItem('access', resp);
      //   console.log('newResponse', resp);
      // });
    } catch (error) {
      console.log('err', error.message);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
