import './ComStyles.css'
import { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { MdGifBox } from "react-icons/md";
import { FaPoll } from "react-icons/fa";
import { PostData, useUser } from '../App';
import GifHandle from './GifHandle';
import {useSave} from '../hooks/useSave'
import { getUserInfo } from '../hooks/getUserInfo';
import { IoMdClose } from "react-icons/io";
import SubScreen from './SubScreen';


const CreatePost = () => {
    const {user, isUserLogged, usersList} = useUser();
    const {saveCurrentUser, saveUsersList} = useSave();
    const {getUserPFP} = getUserInfo();
    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const [media, setMedia] = useState<string[]>([])
    const [gifDisplay, setGifDisplay] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string>('');
    const HandleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (input.length < 295) {
            setInput(e.target.value);
        }else {
            setLimite("300 caracteres max");
        }
    }
    const HandleMediaPost = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (media.length>=4){
            alert('Maximo 4 archivos')
            return
        }
        if (file){
            const maxSize = 8 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('archivos muy pesados')
                e.target.value = ''
                return
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                    setMedia([...media, base64String]);
              };
              reader.readAsDataURL(file);
        }
    }
    const RemoveMedia = (index: number) => {
        const updatedArray = [...media];
        updatedArray.splice(index, 1);
        setMedia(updatedArray);
      };
    const SubmitPost = () => {
        const Tiempo = new Date();
        const Fecha = Tiempo.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        if (input.length < 1 && media.length < 1) {
            alert('Escribe algo o sube una img')
          return;
        }
        const newPost: PostData = {
          id: ('P' + user?.userInfo.posts.length),
          userID: user?.id||'',
          eparent: null,
          content: input,
          media: media,
          score: [],
          negscore: [],
          repost: [],
          comments: [],
          fecha: Fecha,
          postType: 'post',
        };
        if (user) {
            const updatedPostList = [...(user.userInfo.posts || []), newPost];
            user.userInfo.posts = updatedPostList;
            saveCurrentUser(user)
            const updatedList = usersList?.map(item =>
            item.id === user?.id ? user : item) || [];
            saveUsersList(updatedList)
            setOpenModal(true)
            setModalMsg('Se Posteo Correctamente')
          }
    }

    const handleGifClose = () => {
        setGifDisplay(false);
    };
    const handleSelectGif = (gifURL:string) =>{
        if (media.length>=4){
            alert('Maximo 4 archivos')
            return
        }
        setMedia([...media, gifURL])
    }
    return(
        <div className='crp-container'  style={{ display: isUserLogged ? '' : 'none' }}>
            <div className='crp-layout-top'>
                <img className='crp-pfp cursor'  src={getUserPFP(user?.id||'')}/>
                <textarea name='write-post' maxLength={300} onChange={HandleChanges} className='crp-text-area' placeholder='Escribe algo. . .'/>
                <div className='crp-media-display'>
                    {media ? media.map((img, index) => (
                        <div className='crp-media-container' key={index}>
                            <img className='crp-media-item' src={img} alt={`media-${index}`} />
                            <IoMdClose className='crp-media-remove' onClick={()=>RemoveMedia(index)}/>
                        </div>
                    )) : ('')}
                </div>
            </div>

            <div className='crp-layout-bottom'>
                <div className='crp-btns-display'>
                    <div className='relative'>
                        <FaImage className='crp-icon cursor'/>
                        <input onChange={HandleMediaPost} type='file' className='crp-hidden-element'/>
                    </div>
                    <div className='relative'>
                        <MdGifBox className='crp-icon cursor'/>
                        <input type='button' onClick={()=>setGifDisplay(true)} className='crp-hidden-element'/>
                    </div>
                    <div className='relative'>
                        <FaPoll className='crp-icon cursor'/>
                        <input type='button' className='crp-hidden-element'/>
                    </div>
                </div>

                <div className='crp-btn-container'>
                    <h6>
                        {limite}
                    </h6>
                    <button className='crp-btn' onClick={SubmitPost}>
                        Post
                    </button>
                </div>
                <div onClick={(e)=>{e.stopPropagation();}}>
                    <SubScreen Msg={modalMsg} Displ={openModal} />
                </div>
                <GifHandle isDisplay={gifDisplay} onClose={handleGifClose} selectGif={handleSelectGif}/>
            </div>
        </div>
    )
}

export default CreatePost