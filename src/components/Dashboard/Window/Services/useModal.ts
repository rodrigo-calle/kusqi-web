import { useState } from 'react';

const UseModal = () => {
    const [isOpen, setisOpen] = useState<boolean>(false);

    const toggle = ():void => {
        setisOpen(!isOpen)
    }

    return {
        isOpen,
        toggle
    }

}

export default UseModal;