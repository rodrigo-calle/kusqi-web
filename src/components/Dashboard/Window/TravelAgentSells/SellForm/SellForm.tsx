import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import './SellForm.scss';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';


enum PaymentOptionsType {
    YAPE = 'yape',
    PLIN = 'plin',
    WIRE_TRANSFER = 'wire_transfer',
    CASH = 'cash',
}

type PaymentsInputType = {
    id: string;
    paymentType: PaymentOptionsType;
    amount: number;
}

const SellForm = () => {
    const [activePaymentForm, setActivePaymentForm] = React.useState<boolean>(true)
    const [paymentRegister, setPaymentRegister] = React.useState<PaymentsInputType[]>([]);
    const [paymentOptionRows, setPaymentOptionRows] = React.useState<number>(0);
    const [newPayment, setNewPayment] = React.useState<PaymentsInputType>({
        id: '',
        paymentType: PaymentOptionsType.CASH,
        amount: 0
    });
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );


    const paymentOptions: PaymentOptionsType[] = 
        [
            PaymentOptionsType.YAPE, 
            PaymentOptionsType.PLIN, 
            PaymentOptionsType.WIRE_TRANSFER,
            PaymentOptionsType.CASH,
        ]

    const handlePaymentOption = (e: any): void => {
        const { name, value } = e.target;
        setNewPayment((prev) => ({
            ...prev,
            [name]: value,
            ['id']: uuidv4().split('-').join(''),
        }))
    }

    console.log('NEW PAYMENT', newPayment)
    console.log('ARR PAYMENT', paymentRegister)
    // const handleChange = (newValue: Dayjs | null) => {
    // setValue(newValue);
    // };
    return (
        <div className='sell-container-form'>
           <p className='sell-container-form__title'>Registro de Ventas</p>
            <form action="">
                <FormControl fullWidth className='first-form-control form-control'>
                   <TextField 
                     id="client"
                     type={'text'}
                     name="client"
                     label="Cliente"
                     variant="outlined"
                     className='client-input'
                   /> 
                    <TextField 
                        id="dni"
                        type={'dni'}
                        name="dni"
                        label="DNI"
                        variant="outlined"
                        className='dni-input'
                   /> 
                </FormControl>
                <FormControl fullWidth className='second-form-control form-control'>
                <TextField 
                     id="clients_number"
                     type={'number'}
                     name="clients_number"
                     label="Número de Clientes"
                     variant="outlined"
                     className='clients-number-input'
                   /> 
                    <TextField 
                        id="tour"
                        type={'text'}
                        name="tour"
                        label="Destino (tour)"
                        variant="outlined"
                        className='tour-input'
                   /> 
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                            className='date-picker-input'
                            label="Fecha"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            renderInput={(params) => <TextField {...params} />} onChange={function (value: dayjs.Dayjs | null, keyboardInputValue?: string | undefined): void {
                                throw new Error('Function not implemented.');
                            } }                        />
                   </LocalizationProvider>
        
                </FormControl>
                <FormControl fullWidth className='third-form-control form-control'>
                <TextField 
                    id="phone_one"
                    type={'tel'}
                    name="phone_one"
                    label="Contacto 1"
                    variant="outlined"
                    className='phone_input'
                /> 
                <TextField 
                    id="phone_two"
                    type={'tel'}
                    name="phone_two"
                    label="Contacto 2"
                    variant="outlined"
                    className='phone_input'
                /> 
                <Button variant="outlined" endIcon={<LibraryAddIcon />} color={'success'}>
                    Agregar Medios de Pago
                </Button>
                </FormControl>
                {
                    activePaymentForm&&(
                    <FormControl fullWidth className='payment-form-control form-control'>
                        <p className='payment-options-title'>Registro de Pago</p>
                        <br />
                        <div className='row-container'>
                            <TextField 
                                id="amount"
                                type={'number'}
                                name="amount"
                                label="Monto"
                                variant="outlined"
                                className='amount-input'
                                value={newPayment.amount}
                                onChange={handlePaymentOption}
                            /> 
                            <FormControl className='select-option-container'>
                                <InputLabel id="paymentType">Tipo de Pago</InputLabel>
                                <Select
                                    id="paymentType"
                                    name='paymentType'
                                    value={newPayment.paymentType}
                                    label="Tipo de Pago"
                                    onChange={handlePaymentOption}
                                    // error={formik.touched.client && Boolean(formik.errors.client)}
                                > 
                                    {
                                        paymentOptions.map((paymentOption: PaymentOptionsType): React.ReactNode => {
                                        return <MenuItem key={paymentOption} value={paymentOption}>
                                                    {paymentOption}
                                                </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                    
                            <IconButton
                             color='primary' 
                             aria-label="Agregar Método de Pago" 
                             className='add-option-button'
                             onClick={() => setPaymentRegister([...paymentRegister, newPayment])}
                             >
                                <AddCircleIcon />
                            </IconButton>
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