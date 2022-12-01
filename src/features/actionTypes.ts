import { RegisterType } from '../types';

export enum ActionType {
    REGISTER_CLIENT = 'REGISTER_CLIENT',
    UPDATE_CLIENTE = 'UPDATE_CLIENTE',
    CHANGE_OPTION_MENU_DASHBOARD = 'CHANGE_OPTION_MENU_DASHBOARD',
    LOAD_OPTION_MENU_DASHBOARD = 'LOAD_OPTION_MENU_DASHBOARD',

    LOAD_OPEN_SERVICE_FORM = 'LOAD_OPEN_SERVICE_FORM',
    UPDATE_OPEN_SERVICE_FORM = 'UPDATE_OPEN_SERVICE_FORM',

    REGISTER_USER = 'REGISTER_USER',
    UPDATE_USER = 'UPDATE_USER',
    LOAD_USER = 'LOAD_USER',


    LOGIN_USER = 'LOGIN_USER', 
    GET_USER_FROM_LOCAL_STORAGE = 'GET_USER_FROM_LOCAL_STORAGE' ,
    LOGOUT_USER = 'LOGOUT_USER',
}

interface actionLoadUserRegistration {
    type: ActionType.LOAD_USER;
    payload: RegisterType;
}

interface actionUpdateRegistration {
    type: ActionType.UPDATE_CLIENTE;
    payload: RegisterType;
}

interface actionLoginUser {
    type: ActionType.LOGIN_USER;
    payload: unknown;
}

interface actionLogoutUser {
    type: ActionType.LOGOUT_USER;
    payload: string | null;
}

interface actionGetUserFromLS {
    type: ActionType.GET_USER_FROM_LOCAL_STORAGE;
    payload: unknown;
}

export type Action = actionLoadUserRegistration | actionUpdateRegistration | actionLoginUser | actionLogoutUser | actionGetUserFromLS;

// https://dev.to/tris909/how-to-use-redux-with-typescript-1oag?signin=true