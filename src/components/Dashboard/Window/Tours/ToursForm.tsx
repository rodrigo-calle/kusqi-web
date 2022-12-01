import { Button, DialogActions, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ClientType, ServiceType, TouristGuideType, TourType, VehiclesType } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../../../../features/actions';
import { ReducerState } from '../../../../features/reducers';
import clientsServices from '../../../../services/clients'
import vehiclesServices  from '../../../../services/vehicles'
import touristServices  from '../../../../services/touristServices'
import { v4 as uuidv4 } from 'uuid';
import tourService  from '../../../../services/tour'
import touristGuideService  from '../../../../services/touristGuide'



const initialValues: TourType = {
  capacity: 0,
  status: 'PENDING',
  phone: '',
  notes: '',
  key: '',
  client: '',
  vehicle: '',
  service: '',
  touristGuide: '',
  user: '',
}

const TouristGuideForm = () => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: ReducerState) => state.user);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [touristServicesList, setTouristServicesList] = useState([]);
  const [touristGuides, setTouristGuides] = useState([])
  const navigate = useNavigate()

  const getClients = async () => {
    if(user) {
      try {
        const response = await clientsServices.getClients()
        const bodyClient = await response.json()
        // if(response.ok) {
  
          setClients(bodyClient)
        // }
      } catch (error) {
        console.log('No hay clientes registrado')
      }
    }
  }

  const getVehicles = async () => {
    if(user) {
      try {
        const response = await vehiclesServices.getUserVehicles(user.id)
        const bodyVehicles = await response.json()
  
          setVehicles(bodyVehicles)

      } catch (error) {
        console.log('No hay vehículos registrado')
      }
    }
  }

  const getTouristService = async () => {
    if(user) {
      try {
        const response = await touristServices.getUserServices(user.id)
        const servicesData = await response.json()
        setTouristServicesList(servicesData)

      } catch (error) {
        console.log('No hay servicios registrado')
      }
    }
  }

  const getTouristGuide = async () => {
    if(user) {
      try {
        const response = await touristGuideService.getUserTouristGuides(user.id)
        const data = await response.json()
        setTouristGuides(data)

      } catch (error) {
        console.log('No hay servicios registrado')
      }
    }
  }
 
  useEffect(() => {
      dispatch(getUserFromLocalStorage)
      getClients()
      getVehicles()
      getTouristService()
      getTouristGuide()
  }, [dispatch])


  const validationSchema = yup.object({
    capacity: yup
        .number()
        .required('La capacidad es requerida'),
    status: yup
        .string()
        .required('El estado del tour es requerido'),

    client: yup
        .string()
        .required('El cliente es requerido'),
    vehicle: yup
        .string()
        .required('El vehículo es requerido'),
    service: yup
        .string()
        .required('El servicio turístico es requerido'),
    touristGuide: yup
        .string()
        .required('El guía turístico es requerido'),
    phone: yup
        .string()
        .required('Telefono de Cliente es requerido')
        .length(9, 'El número de teléfono debe ser exactamente de 9 dígitos'),

  })

  const TourStatus = ['PENDING','STARTED','COMPLETE','CANCELLED']
  const translateStatus = (status: string) => {
    let statusTransalate = ''
    switch (status) {
      case 'PENDING':
        statusTransalate = 'Pendiente'
        break;
      case 'COMPLETE':
         statusTransalate = 'Completo'
        break;
      case 'STARTED':
          statusTransalate = 'Comenzado'
        break;
      case 'CANCELLED':
          statusTransalate = 'Cancelado'
        break;
      default:
        break;
    }
    return statusTransalate;
  }
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        const valuesParsed = 
        { ...values,
            user: user?.id,
            key: uuidv4().split('-').join('')
        } as TourType;

        try {
            const response = await tourService.createTour(valuesParsed);
            if (response.ok) {
                alert('Tour registrado')
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
        <FormControl fullWidth>
          <InputLabel id="client">Cliente</InputLabel>
          <Select
            id="client"
            name='client'
            value={formik.values.client}
            label="Cliente"
            onChange={formik.handleChange}
            error={formik.touched.client && Boolean(formik.errors.client)}
          > 
          {
            clients.map((client: ClientType): any => {
              return <MenuItem key={client._id} value={client._id}>{client.dni} - {client.name} {client.lastName}</MenuItem>
            })
          }
          </Select>
        </FormControl>
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="touristGuide">Guía Turístico</InputLabel>
          <Select
            id="touristGuide"
            name='touristGuide'
            value={formik.values.touristGuide}
            label="Guía Turístico"
            onChange={formik.handleChange}
            error={formik.touched.touristGuide && Boolean(formik.errors.touristGuide)}
          > 
          {
            touristGuides.map((touristGuide: TouristGuideType): any => {
              return <MenuItem key={touristGuide._id} value={touristGuide._id}>{touristGuide.dni} - {touristGuide.name} {touristGuide.lastName}</MenuItem>
            })
          }
          </Select>
        </FormControl>
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="vehicle">Vehiculo</InputLabel>
          <Select
            id="vehicle"
            name='vehicle'
            value={formik.values.vehicle}
            label="Vehículos"
            onChange={formik.handleChange}
            error={formik.touched.vehicle && Boolean(formik.errors.vehicle)}
          > 
          {
            vehicles.map((vehicle: VehiclesType): any => {
              return <MenuItem key={vehicle._id} value={vehicle._id}>{vehicle.license_plate} - {vehicle.name} {vehicle.lastName}</MenuItem>
            })
          }
          </Select>
        </FormControl>
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="service">Servicio turístico</InputLabel>
          <Select
            id="service"
            name='service'
            value={formik.values.service}
            label="Servicio Turístico"
            onChange={formik.handleChange}
            error={formik.touched.service && Boolean(formik.errors.service)}
          > 
          {
            touristServicesList.map((service: ServiceType): any => {
               return <MenuItem key={service._id} value={service._id}>{service.name} - S/.{service.price}</MenuItem>
            })
          }
          </Select>
        </FormControl>
        <br /><br />
        <TextField
            fullWidth
            id="capacity"
            type='number'
            name='capacity'
            label="Número de Asistentes" 
            variant="standard" 
            value={formik.values.capacity}            
            onChange={formik.handleChange}
            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
            helperText={formik.touched.capacity && formik.errors.capacity}
          />
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="status">Estado de Tour</InputLabel>
          <Select
            id="status"
            name='status'
            value={formik.values.status}
            label="Estado de Tour "
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
          > 
          {
            TourStatus.map((status: string): any => {
              return <MenuItem key={status} value={status}>{translateStatus(status)}</MenuItem>
            })
          }
          </Select>
        </FormControl>
          <br /> <br />
          <TextField
            fullWidth
            id="phone"
            type='text'
            name='phone'
            label="Teléfono de Titular" 
            variant="standard" 
            value={formik.values.phone.toString()}            
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <br /><br />
          <FormControl   fullWidth variant="standard">            
            <TextareaAutosize 
              id='notes'
              name='notes'
              placeholder="Notas"   
              minRows={6}
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </FormControl>
          <br /><br />
          <DialogActions>
            <Button type='submit'>Registrar</Button>
          </DialogActions>
      </form>
  );
}

export default TouristGuideForm;
