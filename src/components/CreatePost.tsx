import './ComStyles.css'
import { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { MdGifBox } from "react-icons/md";
import { FaPoll } from "react-icons/fa";
import { PostData, useUser } from '../App';



const CreatePost = () => {
    const {user, setUser, isUserLogged, usersList, setUsersList} = useUser();
    const [input, setInput] = useState('')
    const [limite, setLimite] = useState('')
    const HandleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (input.length < 295) {
            setInput(e.target.value);
        }else {
            setLimite("300 caracteres max");
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
        if (input.length < 1) {
          return;
        }
        const newPost: PostData = {
          id: ('P' + user?.userInfo.posts.length),
          content: input,
          media: null,
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
        <div className='crp-container'  style={{ display: isUserLogged ? '' : 'none' }}>
            <div className='crp-layout-top'>
                <img className='crp-pfp cursor'  src={user?user.userInfo.pfp:''}/>
                <textarea maxLength={300} onChange={HandleChanges} className='crp-text-area' placeholder='Escribe algo. . .'/>
            </div>

            <div className='crp-layout-bottom'>
                <div className='crp-btns-display'>
                    <FaImage className='crp-icon cursor'/>
                    <MdGifBox className='crp-icon cursor'/>
                    <FaPoll className='crp-icon cursor'/>
                </div>

                <div className='crp-btn-container'>
                    <h6>
                        {limite}
                    </h6>
                    <button className='crp-btn' onClick={SubmitPost}>
                        Post
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreatePost