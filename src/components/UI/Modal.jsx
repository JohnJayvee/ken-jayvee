import {createPortal} from 'react-dom';
import { useRef, useEffect } from 'react';

export default function Modal({children, open, className = '', onClose}){
    const dialog = useRef(); // to connect to the element e.g <dialog> using its built-in prop 'ref='
    useEffect(()=>{
        const modal = dialog.current;
        if(open){
            modal.showModal(); // this is built in method to show <dialog> element
        }
        return () => modal.close() ; //cleanUp function
      
      
    }, [open]);

    return createPortal(<dialog ref={dialog} className={`simple-modal ${className}`} onClose={onClose}>{children}</dialog>, document.getElementById('modal'))

}

