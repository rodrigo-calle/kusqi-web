// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import './SellForm.scss';
// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import { ChangeEvent } from 'react';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useFormik } from 'formik';
// import * as yup from 'yup'
// import touristSellServices from '../../../../../services/touristSells';
// import clientServices from '../../../../../services/clients';
// import { useSelector } from 'react-redux';
// import { ReducerState } from '../../../../../features/reducers';
// import { ClientType } from '../../../../../types';

// type PaymentsInputType = {
//     // id: string;
//     paymentType: string;
//     amount: number;
// }

// type ClientRegistredType = {
//     id: string | null;
//     name: string | null;
//     dni: string | null;
//     phoneOne: string | null;
//     phoneTwo: string | null;
// }

// const SellForm = () => {
//     const userId = useSelector((state: ReducerState) => state.user?.id)
//     const [activePaymentForm, setActivePaymentForm] = React.useState<boolean>(false)
//     const [paymentOptionRows, setPaymentOptionRows] = React.useState<number>(1);
//     const [newPayment, setNewPayment] = React.useState<PaymentsInputType[]>([{
//         paymentType: 'CASH',
//         amount: 0
//     }]);
//     const [clientData, setClientData] = React.useState<ClientRegistredType | null>({
//         id: null,
//         name: null,
//         dni: null,
//         phoneOne: null,
//         phoneTwo: null,
//     })

//     const [documentClient, setDocumentClient] = React.useState<string | null>(null)
//     const [clientList, setClientList] = React.useState<Array<ClientType>>([])
//     const [valueDate, setValueDate] = React.useState<Dayjs | null>(
//         dayjs('2021-08-18T21:11:54'),
//     );
    
//     const removeFields = (index: any) => {
//         const data = [...newPayment]
//         data.splice(index, 1)
//         setNewPayment(data)

//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const paymentOptions: string[] = 
//         [
//             'YAPE', 
//             'PLIN', 
//             'WIRE_TRANSFER',
//             'CASH',
//         ]

//     const handleDynamicFormChange = (
//             index: string | number, 
//             event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//         ) => {
//         const data = [...newPayment]; 
//         data[index][event.target.name] = event.target.value;
//         setNewPayment(data);
//     }

//     const addFieldsToDynamicForm = () => {
//         const newField = {paymentType: 'CASH', amount: 0}
//         setNewPayment([...newPayment, newField]);
//     }

//     const handlePaymentSubmitOptions = () => {
//         setActivePaymentForm(!activePaymentForm)
//     }

//     const initialValues = {
//         client: '',
//         dni: '',
//         clientsNumber: '',
//         tour: '',
//         date: valueDate,
//         phoneOne: '',
//         phoneTwo: '',
//     }
 
//     const validationSchema = yup.object({
//         client: yup
//             .string()
//             .required('El cliente es requerida'),
//         clientsNumber: yup
//             .string()
//             .required('Número de clientes es requerido'),
//         tour: yup
//             .string()
//             .required('Tour es requerido'),
//         date: yup
//             .date()
//             .required('Tour es requerido'),
//         phoneOne: yup
//             .string()
//             .required('Número de Teléfono requerido')
//             .length(9, 'El número de teléfono debe ser exactamente de 9 dígitos')        
//     })

//     const getClientsHandler = async () => {
//         try {        
//             const response = await clientServices.getUserClients(userId ?? '')
//             const  clients = await response.json()
        
//             if(response.ok) {
//                 setClientList(clients)
//             }
//         } catch (error) {   
//             return []
//         }
//     }
//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             console.log({
//                 ...values,
//                 date: valueDate,
//                 paymentList: newPayment,
//             })
//         },
//         validationSchema
//     })

//     console.log(clientList)
//     React.useEffect(() => {
//         getClientsHandler()
//     }, [userId])

//     const handleOnChangeDniInput =  async(dni: string) => {
//         try {
//             const response = await clientServices.getClientByDni(dni)
            
//             if(response) {
//                 const client = await response.json()
//                 setClientData({
//                     id: client._id,
//                     name: `${client.name} ${client.lastName}`,
//                     dni: client.dni,
//                     phoneOne: client.phone,
//                     phoneTwo: null,
//                 })
//             }
//             setClientData(null)
//             setDocumentClient(dni)
//         } catch (error) {
//             setClientData(null)   
//             setDocumentClient(dni) 
//         }   
//     }   

//     console.log(documentClient)
//     return (
//         <div className='sell-container-form'>
//            <p className='sell-container-form__title'>Registro de Ventas</p>
//             <form onSubmit={formik.handleSubmit}>
//                 <FormControl fullWidth className='first-form-control form-control'>
//                 <TextField 
//                     id='client'
//                     type={'text'}
//                     name="client"
//                     label="Cliente"
//                     variant="outlined"
//                     className='client-input'
//                     onChange={formik.handleChange}                 
//                     error={formik.touched.client && Boolean(formik.errors.client)}
//                     value={formik.values.dni}
//                 />
//                 <Autocomplete 
//                         aria-setsize={8}                        
//                         id="client-dni"
//                         freeSolo
//                         disablePortal
//                         options={clientList.map((client: ClientType) => client.dni)}
//                         renderInput={(params) => 
//                             <TextField 
//                                 {...params} 
//                                 label="DNI"
//                             />
//                         }                  
//                         className='dni-input'
//                         onChange={(event: any, document: string | null) => {handleOnChangeDniInput(document ?? '')}}
//                 /> 
//                 </FormControl>
//                 <FormControl fullWidth className='second-form-control form-control'>
//                 <TextField 
//                      id="clientsNumber"
//                      type={'number'}
//                      name="clientsNumber"
//                      label="Número de Clientes"
//                      variant="outlined"
//                      className='clients-number-input'
//                      value={formik.values.clientsNumber}
//                      onChange={formik.handleChange}
//                      error={formik.touched.clientsNumber && Boolean(formik.errors.clientsNumber)}
//                 /> 
//                     <TextField 
//                         id="tour"
//                         type={'text'}
//                         name="tour"
//                         label="Destino (tour)"
//                         variant="outlined"
//                         className='tour-input'
//                         value={formik.values.tour}
//                         onChange={formik.handleChange}
//                         error={formik.touched.tour && Boolean(formik.errors.tour)}
//                    /> 
//                    <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker 
//                             inputFormat='DD/MM/YYYY'
//                             className='date-picker-input'
//                             label="Fecha"
//                             value={valueDate}
//                             onChange={(newValue: Dayjs | null) => {
//                               setValueDate(newValue);
//                             }}
//                             renderInput={(params) => <TextField {...params} />}
//                         />
//                    </LocalizationProvider>
        
//                 </FormControl>
//                 <FormControl fullWidth className='third-form-control form-control'>
//                 <TextField 
//                     id="phoneOne"
//                     type={'tel'}
//                     name="phoneOne"
//                     label="Contacto 1"
//                     variant="outlined"
//                     className='phone_input'
//                     value={formik.values.phoneOne}
//                     onChange={formik.handleChange}
//                     error={formik.touched.phoneOne && Boolean(formik.errors.phoneOne)}
//                 /> 
//                 <TextField 
//                     id="phoneTwo"
//                     type={'tel'}
//                     name="phoneTwo"
//                     label="Contacto 2"
//                     variant="outlined"
//                     className='phone_input'
//                     value={formik.values.phoneTwo}
//                     onChange={formik.handleChange}
//                     error={formik.touched.phoneTwo && Boolean(formik.errors.phoneTwo)}
//                 /> 
//                 {
//                     activePaymentForm&&(
//                         <Button 
//                             variant="outlined" 
//                             endIcon={<VisibilityOffIcon />}
//                             color={'info'}
//                             onClick={() => handlePaymentSubmitOptions()}>
//                             Ocultar Medios de Pago
//                         </Button>
//                     )
//                 }
//                 {
//                     !activePaymentForm&&(
//                         <Button 
//                             variant="outlined" 
//                             endIcon={<LibraryAddIcon />}
//                             color={'success'}
//                             onClick={() => handlePaymentSubmitOptions()}>
//                             Agregar Medios de Pago
//                         </Button>
//                     )
//                 }
//                 </FormControl>
//                 {                    
//                     activePaymentForm&&(
//                     <FormControl fullWidth className='payment-form-control form-control'>
//                         <p className='payment-options-title'>Registro de Pago</p>
//                         <br />
//                             {
//                                 newPayment.map((input, index) => {
//                                     return (
//                                         <div className='row-container' key={index}>
//                                                 <TextField 
//                                                     id="amount"
//                                                     type={'number'}
//                                                     name="amount"
//                                                     label="Monto"
//                                                     variant="outlined"
//                                                     className='amount-input'
//                                                     value={input.amount}
//                                                     onChange={ event => handleDynamicFormChange(index, event)}
//                                                 /> 
//                                                 <FormControl className='select-option-container'>
//                                                     <InputLabel id="paymentType">Tipo de Pago</InputLabel>
//                                                     <Select
//                                                         id="paymentType"
//                                                         name='paymentType'
//                                                         value={input.paymentType}
//                                                         label="Tipo de Pago"
//                                                         onChange={ event => handleDynamicFormChange(index, event)}
//                                                     > 
//                                                         {
//                                                             paymentOptions.map((paymentOption: string): React.ReactNode => {
//                                                             return <MenuItem key={paymentOption} value={paymentOption}>
//                                                                         {paymentOption}
//                                                                     </MenuItem>
//                                                             })
//                                                         }
//                                                     </Select>
//                                                 </FormControl> 
//                                                 <Tooltip title="Eliminar método de pago" placement="top">
//                                                     <IconButton
//                                                         color='error' 
//                                                         aria-label="Eliminar Método de Pago" 
//                                                         className='add-option-button'
//                                                         onClick={() => removeFields(index)}
//                                                         >
//                                                             <RemoveCircleIcon />
//                                                     </IconButton>
//                                                 </Tooltip> 
//                                         </div>
//                                     )
//                                 })
//                             }
                           
//                         <div className='add-row-container'>
//                             {(
//                                 paymentOptionRows === 1 ? 
//                                 <Tooltip title="Agregar Método de Pago" placement="top">
//                                     <IconButton
//                                         color='primary' 
//                                         aria-label="Agregar Método de Pago" 
//                                         className='add-option-button'
//                                         onClick={addFieldsToDynamicForm}
//                                         >
//                                             <AddCircleIcon />
//                                     </IconButton>
//                                 </Tooltip> 

//                                 : 
//                                 <>
//                                     <Tooltip title="Eliminar Método de Pago" placement="top">
//                                         <IconButton
//                                                 color='error' 
//                                                 aria-label="Eliminar Método de Pago" 
//                                                 className='add-option-button'
//                                                 onClick={() => setPaymentOptionRows(paymentOptionRows-1)}
//                                                 >
//                                                     <RemoveCircleIcon />
//                                         </IconButton>
//                                     </Tooltip> 
//                                     <Tooltip title="Agregar Método de Pago" placement="top">
//                                         <IconButton
//                                             color='primary' 
//                                             aria-label="Agregar Método de Pago" 
//                                             className='add-option-button'
//                                             onClick={() => handlePaymentSubmitOptions()}
//                                         >
//                                                 <AddCircleIcon />
//                                         </IconButton>
//                                     </Tooltip>              
//                                 </>

//                             )}
                               
//                         </div>        
//                     </FormControl>)
//                 }
//                 <div className='submit-container'>
//                     <Button variant='contained' type='submit'>
//                         Registrar
//                     </Button>
//                 </div>
    
//             </form>
//         </div>
//     )
// }

// export default SellForm;