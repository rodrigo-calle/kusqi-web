import { Dispatch } from 'redux';
import { DashboardMenuOptionsType } from '../types';
import { CHANGE_OPTION_MENU_DASHBOARD, LOAD_OPTION_MENU_DASHBOARD, UPDATE_OPEN_SERVICE_FORM } from './types';

export const loadOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: LOAD_OPTION_MENU_DASHBOARD, payload: option});
export const changeOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: CHANGE_OPTION_MENU_DASHBOARD, payload: option })
export const loadOpenServiceDashboardForm = (value: boolean) => ({type: LOAD_OPTION_MENU_DASHBOARD, payload: value})
export const updateOpenServiceDashboardForm = (value: boolean) => ({type: UPDATE_OPEN_SERVICE_FORM, payload: value})

export const fetchCurrentOption = async (dispatch: Dispatch, getState: any) => {
    try {
        const currentState = getState();
        dispatch(loadOptionMenuDashboard(currentState()))
    } catch (error) {
        throw Error('Can\'t fetch current menu option')
    }
}

export const updateOptionMenuDashboard = (option: DashboardMenuOptionsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(changeOptionMenuDashboard(option))
    } catch (error) {
        throw Error('Can\'t upload menu option')
    }
}

export const fetchOpenServiceDashboardForm = (dispatch: Dispatch, getState: any) => {
    try {
        const currentState = getState();
        dispatch(loadOpenServiceDashboardForm(currentState))
    } catch (error) {
        throw Error('Can\t fetch current value for form')
    }
}

export const updateOpenServiceDashboardValue = (value: boolean) => async (dispatch: Dispatch)  => {
    try {
        dispatch(updateOpenServiceDashboardForm(value))
    } catch (error) {
        throw Error('Can\'t upload value for form')
    }
}