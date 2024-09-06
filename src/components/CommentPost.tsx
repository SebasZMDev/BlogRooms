import './ComStyles.css'
import { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { PostData, useUser } from '../App';


type Props = {
    parentInfo: [UserID:string, PostID:string]
}

const CommentPost = ({parentInfo}:Props) => {
    const {user, setUser, isUserLogged, usersList, setUsersList} = useUser();
    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const [media, setMedia] = useState<string[]>([])

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
    const SubmitComment = () => {
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
            userData: [user?.id||'',user?.username||'',user?.userInfo.pfp||''],
            eparent: parentInfo,
            content: input,
            media: media,
            score: 0,
            repost: 0,
            comments: [],
            fecha: Fecha,
        };
        if (parentInfo) {
            const updatedList = usersList?.map((usuario) => {
                if (usuario.username === parentInfo[0]) {
                    const post = usuario.userInfo.posts.find((post) => post.id === parentInfo[1]);
                    if (post) {
                        post.comments = [...post.comments, newPost];
                    }
                }
                return usuario;
            });
            console.log(updatedList)
            setUsersList(updatedList?updatedList:null)
            localStorage.setItem('usersList', JSON.stringify(updatedList));
        }


    }



    return(
        <div className='compost-container'  style={{ display: isUserLogged ? '' : 'none' }}>
            <div className='compost-layout-top'>
                <img className='compost-pfp cursor'  src={user?user.userInfo.pfp:''}/>
                <textarea maxLength={300} onChange={HandleChanges} className='compost-text-area' placeholder='Escribe algo. . .'/>
                <TiArrowRightThick className='compost-btn' onClick={SubmitComment}/>
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

export default CommentPost