import { Button, DialogActions, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { TouristGuideType } from '../../../../types';
import touristGuideService from '../../../../services/touristGuide'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../../../../features/actions';
import { ReducerState } from '../../../../features/reducers';

const initialValues: TouristGuideType = {
    name: '',
    lastName: '',
    phone: '',
    dni: '',
    user: '',
}

const TouristGuideForm = () => {
    const dispatch = useDispatch<any>();
    const user = useSelector((state: ReducerState) => state.user);
    useEffect(() => {
        dispatch(getUserFromLocalStorage)
    }, [dispatch])
  const navigate = useNavigate()

  const validationSchema = yup.object({
    name: yup
        .string()
        .required('Nombre de guía es Requerido'),
    lastName: yup
        .string()
        .required('Apellido de guía es Requerido'),

    dni: yup
        .string()
        .required('DNI de Cliente es Requerido y')
        .length(8, 'El documento debe ser exactamente de 8 digitos'),

    phone: yup
        .string()
        .required('Telefono de Cliente es requerido')
        .length(8, 'El número de teléfono debe ser exactamente de 9 dígitos'),

  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        const valuesParsed = 
        { ...values,
            user: user?.id,
        } as TouristGuideType;
        try {
            const response = await touristGuideService.createTouristGuide(valuesParsed);
            if (response.ok) {
                console.log(valuesParsed)
                navigate(0);
            }
        } catch (error) {
            alert(error)
        }
    },
    validationSchema,
  })
  

  return (
      <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            type="search"
            variant="standard"
            name='name'
            id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          /> 
          <br /><br />
          <TextField
            fullWidth
            id="lastName"
            type='text'
            name='lastName'
            label="Apellidos(s)" 
            variant="standard" 
            value={formik.values.lastName}            
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <br /> <br />
          <TextField
            fullWidth
            id="dni"
            type='text'
            name='dni'
            label="Documento de Identidad (DNI)" 
            variant="standard" 
            value={formik.values.dni}           
            onChange={formik.handleChange}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
          />
          <br /> <br />
          <TextField
            fullWidth
            id="phone"
            type='text'
            name='phone'
            label="Teléfono" 
            variant="standard" 
            value={formik.values.phone.toString()}            
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <br /><br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default TouristGuideForm;
