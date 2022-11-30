import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../features/actions';
import { ReducerState } from '../../features/reducers';

const PrivateRoute = ({children}: any) => {
    const dispatch = useDispatch<any>();
    const user = useSelector((state: ReducerState) => state.user)
    useEffect(() => {
        dispatch(getUserFromLocalStorage)
    }, [dispatch])  
    console.log(user)
    if(!user) {
        return <Navigate to="/sign-in"  replace />
    }

    return children;
}

export default PrivateRoute;
