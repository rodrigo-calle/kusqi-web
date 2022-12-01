import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Navigate, RouterProps } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../features/actions';
import { AppDispatch } from '../../features/hooks';
import { ReducerState } from '../../features/reducers';

const PrivateRoute = ({children}: RouterProps) => {
    const dispatch = useDispatch<AppDispatch>();
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
