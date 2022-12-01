// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'redux';
import { DashboardMenuOptionsType, LoginType, RegisterType } from '../types';
import store from './index'
import { 
    CHANGE_OPTION_MENU_DASHBOARD,
    LOAD_OPTION_MENU_DASHBOARD,
    LOAD_USER,
    UPDATE_OPEN_SERVICE_FORM,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER_FROM_LOCAL_STORAGE,
} from './types';
import authServices from '../services/auth';

export const loadOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: LOAD_OPTION_MENU_DASHBOARD, payload: option});
export const changeOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: CHANGE_OPTION_MENU_DASHBOARD, payload: option })
export const loadOpenServiceDashboardForm = (value: boolean) => ({type: LOAD_OPTION_MENU_DASHBOARD, payload: value})
export const updateOpenServiceDashboardForm = (value: boolean) => ({type: UPDATE_OPEN_SERVICE_FORM, payload: value})

// User handler

export const loadUserRegistration = (user: RegisterType) => ({type: LOAD_USER, payload: user})
export const updateUserRegistration = (user: RegisterType) => ({type: LOAD_USER, payload: user})

// sesion handler

export const loginUserMethod = (user: any) => ({ type: LOGIN_USER, payload: user });
export const logoutUserMethod = (token: string | null) => ({ type: LOGOUT_USER, payload: token });
export const getUserFromLocalStorageMethod = (user: any) => ({
    type: GET_USER_FROM_LOCAL_STORAGE,
    payload: user,
  });


export const loadUserRegisterData = async (dispatch: Dispatch, user: RegisterType) => {
    try {
        return store.getState()
    } catch (error) {
        throw Error('Can\'t fetch register data')
    }
}

export const updateUserRegisterData = (user: RegisterType) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateUserRegistration(user))
    } catch (error) {
        throw Error('Can\'t upload user registration data')
    }
}

export const logInUser = (user: LoginType) => async (dispatch: Dispatch) => {
    try {
      const response = await authServices.loginAccount(user);
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwt_decode(data.token);
        dispatch(loginUserMethod(decoded));
        return response
      }
      return response
    } catch (error) {
      return error
    }
};


export const getUserFromLocalStorage = async (dispatch: Dispatch): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
        const decoded = jwt_decode(token);
            dispatch(getUserFromLocalStorageMethod(decoded));
        }
    } catch (error) {
        console.log(error);

    }
};

export const logout = (dispatch: Dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutUserMethod(null));
};
