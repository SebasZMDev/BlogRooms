import './ComStyles.css'
import { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { MdGifBox } from "react-icons/md";
import { FaPoll } from "react-icons/fa";

interface Props {
    logueado: boolean;
}


const CreatePost: React.FC<Props> = ({logueado}) => {

    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const HandleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        if (input.length < 295) {
            setInput(e.target.value);
        }else {
            setLimite("300 caracteres max");
        }
    }

    return(
        <div className='crp-container'  style={{ display: logueado ? '' : 'none' }}>
            <div className='crp-layout-top'>
                <img className='crp-pfp cursor' src='https://i.pinimg.com/originals/37/8a/27/378a270e775265622393da8c0527417e.jpg'/>
                <textarea maxLength={300} onChange={HandleChanges} className='crp-text-area' placeholder='Escribe algo. . .'/>
            </div>

            <div className='crp-layout-bottom'>
                <div>
                    <FaImage color='#4B3A32' className='crp-icon cursor'/>
                    <MdGifBox color='#4B3A32' className='crp-icon cursor'/>
                    <FaPoll color='#4B3A32' className='crp-icon cursor'/>
                </div>

                <div className='crp-btn-container'>
                    <h6>
                        {limite}
                    </h6>
                    <button className='crp-btn' onClick={()=>console.log(input)}>
                        Post
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreatePost