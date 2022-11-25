import { DashboardMenuOptionsType } from '../types';
import { CHANGE_OPTION_MENU_DASHBOARD, LOAD_OPEN_SERVICE_FORM, LOAD_OPTION_MENU_DASHBOARD, UPDATE_OPEN_SERVICE_FORM } from './types';

interface ReducerState {
    dashboardMenu: DashboardMenuOptionsType;
    serviceDashboardForm: boolean;
}
const initialState: ReducerState = {
    dashboardMenu: DashboardMenuOptionsType.HOME,
    serviceDashboardForm: false,
}

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_OPTION_MENU_DASHBOARD:
            return {
                ...state,
                dashboardMenu: action.payload
            }
        case CHANGE_OPTION_MENU_DASHBOARD:
            return {
                ...state,
                dashboardMenu: action.payload,
            }
        case LOAD_OPEN_SERVICE_FORM:
            return {
                ...state,
                serviceDashboardForm: action.payload,
            }
        case UPDATE_OPEN_SERVICE_FORM:
            return {
                ...state,
                serviceDashboardForm: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;
