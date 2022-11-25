import { Button, DialogActions, FormControl, Input, InputLabel, TextareaAutosize, TextField } from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import * as React from 'react';
import { ServiceType } from '../../../../types';
import * as yup from 'yup'

const initialValues: ServiceType = {
  name: '',
  description: '',
  image: '',
  price: 0,
  discount: 0,
  active: false,
}

const ServiceForm = () => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Ingresar nombre de servicio'),
    description: yup
      .string()
      .required('Ingresar descripción de servicio'),
    price: yup
      .number()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }
  })
  

  return (
      <form>
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
          <TextField
            fullWidth
            id="discount"
            type='number'
            name='discount'
            label="Descuento (en porcentaje)" 
            variant="standard" 
            value={formik.values.discount}            
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
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
          <FormControl   fullWidth variant="standard">
            <InputLabel htmlFor="image">Imagen</InputLabel>
            <Input
              id="image"
              type='file'
              name='image'
            />
          </FormControl>
          <br /> <br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default ServiceForm;
