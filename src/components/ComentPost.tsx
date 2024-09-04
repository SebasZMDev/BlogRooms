import './ComStyles.css'
import { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { PostData, useUser } from '../App';




const ComentPost = () => {
    const {user, setUser, isUserLogged, usersList, setUsersList} = useUser();
    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const [media, setMedia] = useState<string[]>([])
    const [gifDisplay, setGifDisplay] = useState<boolean>(false)
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
          content: input,
          media: media,
          score: 0,
          repost: 0,
          comments: [],
          fecha: Fecha,
        };
        if (user) {
            const updatedPostList = [...(user.userInfo.posts || []), newPost];
            user.userInfo.posts = updatedPostList;
            setUser(user)
            localStorage.setItem('actualUser', JSON.stringify(user));
            const updatedList = usersList?.map(item =>
            item.id === user?.id ? user : item) || [];
            setUsersList(updatedList);
            localStorage.setItem('usersList', JSON.stringify(updatedList));
          }
    }

    return(
        <div className='compost-container'  style={{ display: isUserLogged ? '' : 'none' }}>
            <div className='compost-layout-top'>
                <img className='compost-pfp cursor'  src={user?user.userInfo.pfp:''}/>
                <textarea maxLength={300} onChange={HandleChanges} className='compost-text-area' placeholder='Escribe algo. . .'/>
                <FaArrowRight className='compost-btn' onClick={SubmitPost}/>
            </div>
            <div className='compost-layout-bottom'>
                <div className='relative'>
                    <FaImage className='compost-icon cursor'/>
                    <input onChange={HandleMediaPost} type='file' className='compost-hidden-element'/>
                </div>
                <div className='compost-media-display'>
                    {media ? media.map((img, index) => (
                        <img className='compost-media-item' key={index} src={img} alt={`media-${index}`} />
                    )) : ('')}
                    {}
                </div>
                <h5>{limite}</h5>
            </div>
        </div>
    )
}

export default ComentPost