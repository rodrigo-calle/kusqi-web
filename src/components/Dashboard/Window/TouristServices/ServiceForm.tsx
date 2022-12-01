import { Button, DialogActions, FormControl, TextareaAutosize, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { ServiceType } from '../../../../types';
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../../../../features/actions';
import { ReducerState } from '../../../../features/reducers';
import touristServices from '../../../../services/touristServices'
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../features/hooks';

const initialValues: ServiceType = {
  name: '',
  description: '',
  price: 0,
  active: true,
  user: '',
}

const ServiceForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: ReducerState) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
      dispatch(getUserFromLocalStorage)
  }, [dispatch])

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Ingresar nombre de servicio'),
    price: yup
      .number(),
    description: yup
      .string()
      .required('Ingresar descripción de servicio'),
  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        const valuesParsed = 
        { ...values,
            user: user?.id,
            active: true,
        } as ServiceType;
        try {
            const response = await touristServices.createService(valuesParsed);
            if (response.ok) {
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
            id="price"
            type='number'
            name='price'
            label="Precio (en soles)" 
            variant="standard" 
            value={formik.values.price}            
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <br /> <br />
          {/* <TextField
            fullWidth
            id="discount"
            type='checkbox'
            name='discount'
            label="Estado del Servicio" 
            variant="standard" 
            value={formik.values.active}            
            onChange={formik.handleChange}
            error={formik.touched.active && Boolean(formik.errors.active)}
            helperText={formik.touched.active && formik.errors.active}
          /> */}
          <br /> <br />
          <FormControl   fullWidth variant="standard">            
            <TextareaAutosize 
              id='description'
              name='description'
              placeholder="Descripción"   
              minRows={6}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </FormControl>
          <br /><br />
          {/* <FormControl   fullWidth variant="standard">
            <InputLabel htmlFor="image">Imagen</InputLabel>
            <Input
              id="image"
              type='file'
              name='image'
            />
          </FormControl> */}
          <br /> <br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default ServiceForm;
