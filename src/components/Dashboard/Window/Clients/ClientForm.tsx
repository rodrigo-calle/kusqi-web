import { Button, DialogActions, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ClientType } from '../../../../types';
import clientServices from '../../../../services/clients'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../../../features/reducers';

const initialValues: ClientType = {
    name: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    provenance: '',
}

const ClientForm = () => {
  const navigate = useNavigate()
  const user = useSelector((state: ReducerState) => state.user)

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Nombre de Cliente es Requerido'),
    lastName: yup
    .string().nullable(),

    dni: yup
    .string()
    .required('DNI de Cliente es Requerido y')
    .length(8, 'El documento debe ser exactamente de 8 digitos'),

    email: yup
    .string().nullable(),

    phone: yup
    .string().required('Telefono de Cliente es requerido')
    .length(9, 'El teléfono debe contener exactamente 9 digitos'),

    provenance: yup
    .string().nullable(),

  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        const valuesParsed = 
        { ...values,
          user: user?.id,
        } as ClientType;
        
        try {
            const response = await clientServices.createClient(valuesParsed);
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
            id="email"
            type='email'
            name='email'
            label="Correo Electrónico" 
            variant="standard" 
            value={formik.values.email}            
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <br /><br />
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
          <TextField
            fullWidth
            id="provenance"
            type='text'
            name='provenance'
            label="Origen" 
            variant="standard" 
            value={formik.values.provenance}            
            onChange={formik.handleChange}
            error={formik.touched.provenance && Boolean(formik.errors.provenance)}
            helperText={formik.touched.provenance && formik.errors.provenance}
          />
          <br /> <br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default ClientForm;
