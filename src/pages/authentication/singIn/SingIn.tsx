import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import authServices from '../../../services/auth';
import { useDispatch } from 'react-redux';
import { getUserFromLocalStorage, logInUser } from '../../../features/actions';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kusqi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Debes de ingresar tu email'),
    password: yup
      .string()
      .required('Debes de ingresar tu password')
    
  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        dispatch(logInUser({
          email: values.email,
          password: values.password,
        })).then((value: any) => {
          if(value.status === 200) {
            navigate('/dashboard/home/')
          } else {
            alert('Revise nuevamente los credenciales por favor')
          }
        }).catch(
          console.log('Login exitoso')
        )

        // dispatch(getUserFromLocalStorage);
        // const user = await useSelector((state: ReducerState) => state.user)
      
      } catch (error) {
        console.log('login error', error)
      }
    },
    validationSchema,
  })
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://kusqi-dev.s3.us-east-1.amazonaws.com/web-images/welcome-login-page.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Inicio de Sesión
            </Typography>
            <br /><br />
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                autoFocus
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
                value={formik.values.email}            
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <br /><br />
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formik.values.password}            
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
            Iniciar Sesión    
             </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {'¿No tienes cuenta? Regístrate'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
