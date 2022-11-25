import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Dialog.scss';
interface ModalType {
  children?: React.ReactNode;
  isOpen: boolean,
  toggle: () => void;
  title: string;
  contentText?: string;
}



const DialogDashboard = (props: ModalType) => {
  return (
    <>
      {props.isOpen && (
        <Dialog onClick={props.toggle} open={true}>
          <div onClick={(e) => e.stopPropagation()}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Para el registro del nuevo servicio debe rellenar el formulario completo.
              </DialogContentText>
              {props.children}
              <div className='cancel-btn__container'>
                <Button 
                  onClick={props.toggle}             
                >
                  Cancelar
                </Button>
              </div>     
              </DialogContent>           
          </div>
        </Dialog>
      )}
    </>

  );
}

export default DialogDashboard;
