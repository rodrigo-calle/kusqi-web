/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import './SellForm.scss';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ChangeEvent } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type PaymentsInputType = {
    // id: string;
    paymentType: string;
    amount: number;
}

const SellForm = () => {
    const [activePaymentForm, setActivePaymentForm] = React.useState<boolean>(false)
    const [paymentOptionRows, setPaymentOptionRows] = React.useState<number>(1);
    const [newPayment, setNewPayment] = React.useState<PaymentsInputType[]>([{
        paymentType: 'CASH',
        amount: 0
    }]);
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const removeFields = (index: any) => {
        const data = [...newPayment]
        data.splice(index, 1)
        setNewPayment(data)

    }


    const paymentOptions: string[] = 
        [
            'YAPE', 
            'PLIN', 
            'WIRE_TRANSFER',
            'CASH',
        ]

    const handleDynamicFormChange = (index: string | number, event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  // ChangeEvent<HTMLInputElement | HTMLTextAreaElement | PaymentOptionsType >) => {
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
        console.log(activePaymentForm)
    }

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
                            value={value}                        // onChange={handlePaymentOption}
                            // error={formik.touched.client && Boolean(formik.errors.client)}
                            renderInput={(params) => <TextField {...params} />} onChange={function (_value: dayjs.Dayjs | null, keyboardInputValue?: string | undefined): void {
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
                    
                           {/* { [...Array(paymentOptionRows)].map((e, i) => {
                                   return  (
                                    <div className='row-container' key={i}>
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
                                        <Tooltip title="Agregar Método de Pago" placement="top">
                                            <IconButton
                                                color='error' 
                                                aria-label="Agregar Método de Pago" 
                                                className='add-option-button'
                                                // onClick={() => setPaymentOptionRows(paymentOptionRows+1)}
                                                onClick={handlePaymentSubmitOptions}
                                                >
                                                    <RemoveCircleIcon />
                                            </IconButton>
                                        </Tooltip>                 
                                    </div>  
                                )
                            })} */}
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
                                                        // onChange={handlePaymentOption}
                                                        // error={formik.touched.client && Boolean(formik.errors.client)}
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