import { Dispatch } from 'redux';
import { DashboardMenuOptionsType } from '../types';
import { CHANGE_OPTION_MENU_DASHBOARD, LOAD_OPTION_MENU_DASHBOARD } from './types';

export const loadOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: LOAD_OPTION_MENU_DASHBOARD, payload: option});
export const changeOptionMenuDashboard = (option: DashboardMenuOptionsType) => ({ type: CHANGE_OPTION_MENU_DASHBOARD, payload: option })

export const fetchCurrentOption = async (dispatch: any, getState: any) => {
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