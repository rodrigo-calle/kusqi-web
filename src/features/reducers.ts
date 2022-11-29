import { BusinessCategories, RegisterType } from '../types';
import { 
    REGISTER_USER,
    LOAD_USER,
    UPDATE_USER,
    LOGIN_USER,
    GET_USER_FROM_LOCAL_STORAGE,
    LOGOUT_USER
} from './types';

export interface ReducerState {
    // dashboardMenu: DashboardMenuOptionsType;
    // serviceDashboardForm: boolean;
    register: RegisterType;
    user: {
      id: string;
      email: string;
      name: string;
      ruc: string;
      avatar: string;
      iat: string;
      exp: string;
    } | null;
}
const initialState: ReducerState = {
    // dashboardMenu: DashboardMenuOptionsType.HOME,
    // serviceDashboardForm: false,
    register: {
        category: BusinessCategories.TOURIST_AGENT,
        name: '',
        password: '',
        email: '',
    },
    user: null,
}

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case LOGIN_USER:
            return {
              ...state,
              user: action.payload,
            };
      
          case LOGOUT_USER:
            return {
              ...state,
              user: action.payload,
            };
          case GET_USER_FROM_LOCAL_STORAGE: {
            return {
              ...state,
              user: action.payload,
            };
          }
        case REGISTER_USER:
            return {
                ...state,
                register: action.payload,
            }
        case UPDATE_USER:
            return {
                ...state,
                register: action.payload as RegisterType,
            }
        case LOAD_USER:
            return {
                    ...state,
                    register: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;
