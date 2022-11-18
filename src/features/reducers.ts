import { DashboardMenuOptionsType } from '../types';
import { CHANGE_OPTION_MENU_DASHBOARD, LOAD_OPTION_MENU_DASHBOARD } from './types';

interface ReducerState {
    dashboardMenu: DashboardMenuOptionsType;
}
const initialState: ReducerState = {
    dashboardMenu: DashboardMenuOptionsType.HOME,
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
    
        default:
            return state;
    }
}

export default reducer;
