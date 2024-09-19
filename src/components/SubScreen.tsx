import { useEffect, useState } from 'react';
import './ComStyles.css'

type Props = {
    Msg: string;
    Displ: boolean;
}

const SubScreen = ({Msg, Displ}: Props) => {

    const [Mensaje, setMensaje] = useState('');
    const [Display, setDisplay] = useState<boolean>(true);

    const Cerrar = () =>{
        setDisplay(!Display)
    }

    useEffect(()=>{
        setMensaje(Msg)
        setDisplay(Displ)
    },[Displ])

    return (
        <div className='subscreen-container' style={{display:Display?'':'none'}}>
            <div className='subscreen-bg'>
            </div>
            <div className='subscreen-div'>
                <h4 className='subscreen-text'>
                    {Mensaje}
                </h4>
                <button className='subscreen-btn' onClick={Cerrar}>Aceptar</button>
            </div>
        </div>
    );
}

export default SubScreen;
