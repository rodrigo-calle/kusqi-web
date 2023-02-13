import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';
import RigthSection from '../../components/RightSide/Index';
import { getUserFromLocalStorage } from '../../features/actions';
import { AppDispatch, RootState } from '../../features/hooks';
import './homePage.scss';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)

    useEffect(()=> {
        dispatch(getUserFromLocalStorage)
    }, [dispatch])

    if(user !== null) {
        return <Navigate to="/dashboard/home" replace />
    }

    return (
        <div className='main-page-container'>
            <nav>
                <Navbar />
            </nav>
            <section>
                <div className='left-container'>
                    <LeftSideBar />
                </div>
                
                <main className='posts-container'>
                    <Post />
                    <Post />
                </main>
                <div className='right-container'>
                    <RigthSection />
                </div>
            </section>
        
            {/* <h2>Bienvenido a Kusqi V.0.1</h2> 
            <div className='root-container-home'>
                <div className='btn-container'>
                    <Button variant="contained" startIcon={<VpnKeyIcon />} onClick={()=> navigate('/sign-in')}>Iniciar Sesión</Button>
                    <p>o</p>
                    <Button variant="contained" startIcon={<PersonAddAlt1Icon />} onClick={()=> navigate('/sign-up')}>Regístrate</Button>
                </div>
                
            </div> */}
        </div>
        
    )
}

export default HomePage;