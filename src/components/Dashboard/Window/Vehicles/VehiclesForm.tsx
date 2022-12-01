/* eslint-disable camelcase */
import { Button, DialogActions, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { VehiclesType } from '../../../../types';
import vehiclesServices from '../../../../services/vehicles'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../../../../features/actions';
import { ReducerState } from '../../../../features/reducers';
import { AppDispatch } from '../../../../features/hooks';

const initialValues: VehiclesType = {
    name: '',
    lastName: '',
    phone: '',
    license_plate: '',
    seats_number: 0,
    user: '',
}

const VehicleForm = () => {
    const dispatch = useDispatch<AppDispatch>();
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

    license_plate: yup
        .string()
        .required('Número de placa del vehículo requerido'),
    phone: yup
        .string()
        .required('Telefono de Cliente es requerido')
        .length(8, 'El número de teléfono debe ser exactamente de 9 dígitos'),
    seats_number: yup
        .number()
        .min(2)
        .max(60)

  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        const valuesParsed = 
        { ...values,
            user: user?.id,
        } as VehiclesType;
        try {
            const response = await vehiclesServices.createVehicle(valuesParsed);
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
            id="license_plate"
            type='text'
            name='license_plate'
            label="Placa Vehicular" 
            variant="standard" 
            value={formik.values.license_plate}           
            onChange={formik.handleChange}
            error={formik.touched.license_plate && Boolean(formik.errors.license_plate)}
            helperText={formik.touched.license_plate && formik.errors.license_plate}
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
          <TextField
            fullWidth
            id="seats_number"
            type='number'
            name='seats_number'
            label="Número de asientos" 
            variant="standard" 
            value={formik.values.seats_number}            
            onChange={formik.handleChange}
            error={formik.touched.seats_number && Boolean(formik.errors.seats_number)}
            helperText={formik.touched.seats_number && formik.errors.seats_number}
          />
          <br /><br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default VehicleForm;
