import './ComStyles.css'
import { useState } from 'react';
import Post from '../components/Post'
import { useUser } from '../App';

const UserPosts = () => {
    const {user} = useUser();
    const [btnPress, setBtnPress] = useState<number>(1);

    const ButtonPressed = (index:number) => {
        setBtnPress(index)
    }

    return (
        <div className='posts-general-container'>
            <div className='posts-btns-container'>
                <button onClick={()=>ButtonPressed(1)} className={btnPress==1? 'post-btns-selected' : 'posts-btns'}>
                    Posts
                </button>
                <button onClick={()=>ButtonPressed(2)} className={btnPress==2? 'post-btns-selected' : 'posts-btns'}>
                    Media
                </button>
                <button onClick={()=>ButtonPressed(3)} className={btnPress==3? 'post-btns-selected' : 'posts-btns'}>
                    Likes
                </button>
            </div>
            <div className='posts-container'>
            {btnPress === 1 && user?user.userInfo.posts.map((post)=>(
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p>Score: {post.score}</p>
                  <p>Repost: {post.repost}</p>
                  <p>Comments: {post.comments}</p>
                  <p>Date: {post.fecha.toDateString()}</p>
                </div>)):
            (<Post/>)}
            {btnPress === 2 && <img style={{width:'100%', height:'300px'}} src='https://miro.medium.com/v2/resize:fit:600/1*m-HhwOVJaBrnOC6k5LjIjw.jpeg'/>}
            {btnPress === 3 && <img style={{width:'100%', height:'300px'}} src='https://preview.redd.it/nah-why-family-guy-looking-at-me-while-shitting-out-his-ass-v0-sq20wcinpobc1.jpeg?width=640&crop=smart&auto=webp&s=15d532db4ad32d9e1da6948de526043f4f5f680d'/>}
            </div>
        </div>
    );
}

export default UserPosts;