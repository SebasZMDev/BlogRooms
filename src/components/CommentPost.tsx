import './ComStyles.css'
import { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { TiArrowRightThick } from "react-icons/ti";
import { PostData, useUser } from '../App';
import {useSave} from '../hooks/useSave'
import { getUserInfo } from '../hooks/getUserInfo';
import SubScreen from './SubScreen';


type Props = {
    parentInfo: [UserID:string, PostID:string]
}

const CommentPost = ({parentInfo}:Props) => {
    const {user, setUser, isUserLogged, usersList} = useUser();
    const {saveCurrentUser, saveUsersList} = useSave();
    const {getUsername, getUserPosts, getUserThisPost} = getUserInfo();
    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const [media, setMedia] = useState<string[]>([])
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
            id: ('P' + getUserPosts(user?.id||'')?.length),
            userID: user?.id||'',
            eparent: parentInfo,
            content: input,
            media: media,
            score: [],
            negscore: [],
            repost: [],
            comments: [],
            fecha: Fecha,
            postType: 'comment'
        };
        if (parentInfo) {
            setOpenModal(true)
            setModalMsg('Comentario posteado!')
            const updatedList = usersList?.map((usuario) => {
                const ThisPost = getUserThisPost(parentInfo[0],parentInfo[1])
                if (ThisPost) {
                    ThisPost.comments = [...ThisPost.comments, newPost];
                }
                setUser(usuario)
                return usuario;
/*                 if (usuario.id === getUsername(parentInfo[0])) {
                    const post = usuario.userInfo.posts.find((post) => post.id === parentInfo[1]);
                    if (post) {
                        post.comments = [...post.comments, newPost];
                    }
                }
                setUser(usuario)
                return usuario; */
            });
            if (updatedList){
                saveUsersList(updatedList)
               if (user) {
                    const updatedPostList = [...(user.userInfo.posts || []), newPost];
                    user.userInfo.posts = updatedPostList;
                    saveCurrentUser(user)
                    const reUpdatedList = updatedList?.map(item =>
                    item.id === user?.id ? user : item) || [];
                    saveUsersList(reUpdatedList)
                  }
            }
        }
    }



    return(
        <div className='compost-container'  style={{ display: isUserLogged ? '' : 'none' }}>
            <div className='compost-layout-top'>
                <div className='relative'>
                    <IoMdAddCircle className='compost-icon cursor'/>
                    <input onChange={HandleMediaPost} type='file' className='compost-hidden-element'/>
                </div>
                <textarea maxLength={300} onChange={HandleChanges} className='compost-text-area' placeholder='Comentar. . .'/>
                <button className='compost-btn' onClick={SubmitComment}>
                    <TiArrowRightThick size={25}/>
                </button>
            </div>
            <div className='compost-layout-bottom'>

                <div className='compost-media-display'>
                    {media ? media.map((img, index) => (
                        <img className='compost-media-item' key={index} src={img} alt={`media-${index}`} />
                    )) : ('')}
                    {}
                </div>
                <h5>{limite}</h5>
            </div>
            <div onClick={(e)=>{e.stopPropagation();}}>
                <SubScreen Msg={modalMsg} Displ={openModal} />
            </div>
        </div>
    )
}

export default CommentPost