/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import './SellForm.scss';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ChangeEvent } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup'
import touristSellServices from '../../../../../services/touristSells';
import clientServices from '../../../../../services/clients';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../../../../features/reducers';
import { ClientType } from '../../../../../types';

type PaymentsInputType = {
    // id: string;
    paymentType: string;
    amount: number;
}

type ClientRegistredType = {
    id: string | null;
    completeName: string | null;
    dni: string | null;
    phoneOne: string | null;
    phoneTwo: string | null;
}

const SellForm = () => {
    const userId = useSelector((state: ReducerState) => state.user?.id)
    const [activePaymentForm, setActivePaymentForm] = React.useState<boolean>(false)
    const [paymentOptionRows, setPaymentOptionRows] = React.useState<number>(1);
    const [newPayment, setNewPayment] = React.useState<PaymentsInputType[]>([{
        paymentType: 'CASH',
        amount: 0
    }]);
    const [clientData, setClientData] = React.useState<ClientRegistredType | null>(null)

    const [clientList, setClientList] = React.useState<Array<ClientType>>([])
    const [valueDate, setValueDate] = React.useState<Dayjs | null>(
        dayjs(),
    );
        
    React.useEffect(() => {
        getClientsHandler()
    }, [userId])

    
    const removeFields = (index: any) => {
        const data = [...newPayment]
        data.splice(index, 1)
        setNewPayment(data)

    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const paymentOptions: string[] = 
        [
            'YAPE', 
            'PLIN', 
            'WIRE_TRANSFER',
            'CASH',
        ]

    const handleDynamicFormChange = (
            index: string | number, 
            event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
        const data = [...newPayment]; 
        data[index][event.target.name] = event.target.value;
        setNewPayment(data);
    }

    const addFieldsToDynamicForm = () => {
        const newField = {paymentType: 'CASH', amount: 0}
        setNewPayment([...newPayment, newField]);
    }

    const handlePaymentSubmitOptions = () => {
        setActivePaymentForm(!activePaymentForm)
    }

    const initialValues = {
        client: '',
        dni: '',
        clientsNumber: '',
        tour: '',
        date: valueDate,
        phoneOne: '',
        phoneTwo: '',
    }

    const validationSchema = yup.object().shape({
        dni: yup
            .string()
            .required('El dni es requerido')
            .length(8, 'El documento debe ser exactamente de 8 digitos'),
        client: yup
            .string()
            .required('El cliente es requerido'),
        date: yup
            .date()
            .required('La fecha es requerida')
            .min(today, 'La fecha mínima es hoy'),
        clientsNumber: yup
            .string()
            .required('Número de clientes es requerido'),
        tour: yup
            .string()
            .required('Tour es requerido'),
        phoneOne: yup
            .string()
            .required('Número de Teléfono requerido')
            .length(9, 'El número de teléfono debe ser exactamente de 9 dígitos')        
    })

    const getClientsHandler = async () => {
        try {        
            const response = await clientServices.getUserClients(userId ?? '')
            const  clients = await response.json()
        
            if(response.ok) {
                setClientList(clients)
            }
        } catch (error) {   
            return []
        }
    }

    const handleOnChangeDniInput =  async(dni: string) => {
        try {            
            const response = await clientServices.getClientByDni(dni)
           
            if(response) {
                const client = await response.json()
                setClientData({
                    id: client[0]._id,
                    completeName: client[0].completeName,
                    dni: client[0].dni,
                    phoneOne: client[0].phoneOne,
                    phoneTwo: client[0].phoneTwo,
                })

                formik.values.dni = client[0].dni
                formik.values.client = client[0].completeName
                formik.values.phoneOne = client[0].phoneOne
            }        
        } catch (error) {
            setClientData(null)   
        }   
    }   

    const createTouristSellsMethod = async (values: ClientType, clientId: string, tour: string) => {
        try {
            await touristSellServices.createTouristSell({
                ...values,
                client: clientId,
                dni: values.dni,
                phoneOne: values.phoneOne,
                phoneTwo: values.phoneTwo ?? '',
                date: valueDate,
                paymentList: newPayment,
                user: userId ?? '',
                tour,
                clientsNumber: 0
            }).then((response) => {
                response.ok ? alert('Venta Registrada') : alert('No se pudo crear la venta, comunicarse con el administrador de kusqi');

            }).catch((error) => {alert(error)})
            resetCompleteForm()
        } catch (error) {
            console.log('No se pudo registar venta');
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const valuesParsed = values as unknown as ClientType;
            if(!clientData) {
                const client: ClientType = {
                    completeName: values.client,
                    phoneOne: values.phoneOne,
                    phoneTwo: values.phoneTwo,
                    dni: values.dni,
                    provenance: '',
                    email: '',
                    user: userId,
                }
                const clientResponse = await clientServices.createClient(client)
                const newClientParsed = await clientResponse.json();

                await createTouristSellsMethod(valuesParsed, newClientParsed._id, values.tour)
                resetCompleteForm()
            }   
                const client: ClientType = {
                    completeName: clientData?.completeName ?? '',
                    phoneOne: clientData?.phoneOne ?? '',
                    phoneTwo: values.phoneTwo ?? '',
                    dni: clientData?.dni ?? '',
                    provenance: '',
                    email: '',
                    user: userId,
                }
                await createTouristSellsMethod(client, clientData?.id ?? '', values.tour)
                resetCompleteForm()
        },
        validationSchema        
    })

    const resetCompleteForm = () : void => {
        formik.values.client = '';
        formik.values.dni = '';
        formik.values.phoneOne = ''
        formik.resetForm();
        setNewPayment([])
        setActivePaymentForm(false)
    }



    return (
        <div className='sell-container-form'>
           <p className='sell-container-form__title'>Registro de Ventas</p>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth className='first-form-control form-control'>
                <TextField 
                    id='client'
                    type='text'
                    name="client"
                    label="Cliente"
                    variant="outlined"
                    className='client-input'
                    value={clientData?.completeName ?? formik.values.client}
                    onChange={formik.handleChange}                 
                    error={formik.touched.client && Boolean(formik.errors.client)}
                    helperText={formik.touched.client && formik.errors.client}               
                />
                <Autocomplete 
                        aria-setsize={8}                        
                        id="client-dni"
                        freeSolo
                        disablePortal
                        // value={formik.values.dni}
                        // onChange={(event, value) => handleChange(value)}
                        options={clientList.map((client: ClientType) => client.dni)}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                name="dni"
                                id='dni'
                                type={'text'}
                                label="DNI"
                                onChange={formik.handleChange}   
                                value={formik.values.dni}
                                error={formik.touched.dni && Boolean(formik.errors.dni)}
                                helperText={formik.touched.dni && formik.errors.dni}               

                            />
                        }                  
                        className='dni-input'
                        onChange={(event: any, document: string | null) => {handleOnChangeDniInput(document ?? '')}}
                /> 
                </FormControl>
                <FormControl fullWidth className='second-form-control form-control'>
                <TextField 
                     id="clientsNumber"
                     type='number'
                     name="clientsNumber"
                     label="Número de Clientes"
                     variant="outlined"
                     className='clients-number-input'
                     value={formik.values.clientsNumber}
                     onChange={formik.handleChange}
                     error={formik.touched.clientsNumber && Boolean(formik.errors.clientsNumber)}
                     helperText={formik.touched.clientsNumber && formik.errors.clientsNumber}               
                /> 
                    <TextField 
                        id="tour"
                        type='text'
                        name="tour"
                        label="Destino (tour)"
                        variant="outlined"
                        className='tour-input'
                        value={formik.values.tour}
                        onChange={formik.handleChange}
                        error={formik.touched.tour && Boolean(formik.errors.tour)}
                        helperText={formik.touched.tour && formik.errors.tour}               
                   /> 
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            inputFormat='DD/MM/YYYY'
                            minDate={dayjs()}
                            className='date-picker-input'
                            label="Fecha"
                            value={valueDate}
                            onChange={(newValue: Dayjs | null) => {
                              setValueDate(newValue);
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    id='date'
                                    name='date'
                                    value={valueDate}
                                    {...params} 
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}   
                                />}            
                        />
                   </LocalizationProvider>
        
                </FormControl>
                <FormControl fullWidth className='third-form-control form-control'>
                <TextField 
                    id="phoneOne"
                    type={'tel'}
                    name="phoneOne"
                    label="Contacto 1"
                    variant="outlined"
                    className='phone_input'
                    value={clientData?.phoneOne ?? formik.values.phoneOne}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneOne && Boolean(formik.errors.phoneOne)}
                    helperText={formik.touched.phoneOne && formik.errors.phoneOne}   

                /> 
                <TextField 
                    id="phoneTwo"
                    type={'tel'}
                    name="phoneTwo"
                    label="Contacto 2"
                    variant="outlined"
                    className='phone_input'
                    value={formik.values.phoneTwo}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneTwo && Boolean(formik.errors.phoneTwo)}
                    helperText={formik.touched.phoneTwo && formik.errors.phoneTwo}   

                /> 
                {
                    activePaymentForm&&(
                        <Button 
                            variant="outlined" 
                            endIcon={<VisibilityOffIcon />}
                            color={'info'}
                            onClick={() => handlePaymentSubmitOptions()}>
                            Ocultar Medios de Pago
                        </Button>
                    )
                }
                {
                    !activePaymentForm&&(
                        <Button 
                            variant="outlined" 
                            endIcon={<LibraryAddIcon />}
                            color={'success'}
                            onClick={() => handlePaymentSubmitOptions()}>
                            Agregar Medios de Pago
                        </Button>
                    )
                }
                </FormControl>
                {                    
                    activePaymentForm&&(
                    <FormControl fullWidth className='payment-form-control form-control'>
                        <p className='payment-options-title'>Registro de Pago</p>
                        <br />
                            {
                                newPayment.map((input, index) => {
                                    return (
                                        <div className='row-container' key={index}>
                                                <TextField 
                                                    id="amount"
                                                    type={'number'}
                                                    name="amount"
                                                    label="Monto"
                                                    variant="outlined"
                                                    className='amount-input'
                                                    value={input.amount}
                                                    onChange={ event => handleDynamicFormChange(index, event)}
                                                /> 
                                                <FormControl className='select-option-container'>
                                                    <InputLabel id="paymentType">Tipo de Pago</InputLabel>
                                                    <Select
                                                        id="paymentType"
                                                        name='paymentType'
                                                        value={input.paymentType}
                                                        label="Tipo de Pago"
                                                        onChange={ event => handleDynamicFormChange(index, event)}
                                                    > 
                                                        {
                                                            paymentOptions.map((paymentOption: string): React.ReactNode => {
                                                            return <MenuItem key={paymentOption} value={paymentOption}>
                                                                        {paymentOption}
                                                                    </MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl> 
                                                <Tooltip title="Eliminar método de pago" placement="top">
                                                    <IconButton
                                                        color='error' 
                                                        aria-label="Eliminar Método de Pago" 
                                                        className='add-option-button'
                                                        onClick={() => removeFields(index)}
                                                        >
                                                            <RemoveCircleIcon />
                                                    </IconButton>
                                                </Tooltip> 
                                        </div>
                                    )
                                })
                            }
                           
                        <div className='add-row-container'>
                            {(
                                paymentOptionRows === 1 ? 
                                <Tooltip title="Agregar Método de Pago" placement="top">
                                    <IconButton
                                        color='primary' 
                                        aria-label="Agregar Método de Pago" 
                                        className='add-option-button'
                                        onClick={addFieldsToDynamicForm}
                                        >
                                            <AddCircleIcon />
                                    </IconButton>
                                </Tooltip> 

                                : 
                                <>
                                    <Tooltip title="Eliminar Método de Pago" placement="top">
                                        <IconButton
                                                color='error' 
                                                aria-label="Eliminar Método de Pago" 
                                                className='add-option-button'
                                                onClick={() => setPaymentOptionRows(paymentOptionRows-1)}
                                                >
                                                    <RemoveCircleIcon />
                                        </IconButton>
                                    </Tooltip> 
                                    <Tooltip title="Agregar Método de Pago" placement="top">
                                        <IconButton
                                            color='primary' 
                                            aria-label="Agregar Método de Pago" 
                                            className='add-option-button'
                                            onClick={() => handlePaymentSubmitOptions()}
                                        >
                                                <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>              
                                </>

                            )}
                               
                        </div>        
                    </FormControl>)
                }
                <div className='submit-container'>
                    <Button variant='contained' type='submit'>
                        Registrar
                    </Button>
                </div>
    
            </form>
        </div>
    )
}

export default SellForm;