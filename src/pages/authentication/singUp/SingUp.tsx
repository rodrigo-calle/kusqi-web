import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { updateUserRegisterData } from '../../../features/actions';
import { BusinessCategories, RegisterType } from '../../../types';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface SignUpPropsType {
    handleNext: () => void
}

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

const SignUp = (props: SignUpPropsType) => {
    const dispatch = useDispatch<any>()
    const initialValues = {
        email: '',
        password: '',
        name: '',
        category: ''
    }
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('El nombre de negocio es requerido'),
        email: yup
            .string()
            .required('El correo es requerido'),
        password: yup
            .string()
            .required('El password es requerido')
            .min(8, 'La contraseña debe contener por los menos 8 caracteres')
            .max(32, 'La contraseña debe contener como máximo 32 caracteres'),
        category: yup
            .string().nullable()
    })

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const valuesParsed = {
                ...values,
            } as RegisterType;

            try {    
                dispatch(updateUserRegisterData(valuesParsed))
            } catch(e) {
                console.log('error register', e)
            }

            props.handleNext()
        },
        validationSchema,
    })


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Nombre de Negocio*"
                    name="name"
                    autoComplete="name"
                    value={formik.values.name}            
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo*"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}            
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña*"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}            
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Deseo recibir correos promocionales de Kusqi."
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                    Siguiente
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/sign-in" variant="body2">
                    ¿Ya tienes una cuenta? Inicia Sesión aquí
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUp;