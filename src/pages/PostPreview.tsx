import NavBar from "../components/NavBar";
import Frases from "../components/Frases";
import Post from '../components/Post'
import { useLocation } from "react-router-dom";
import ComentPost from "../components/CommentPost";
import { useEffect } from "react";
import { PostData } from "../App";


const PostPreview = ({}) => {
    const location = useLocation();
    const post = location.state;

    if (!post) {
      return <div>No post data available</div>;
    }
    useEffect(()=>{
        console.log(post)
    },[])
    return(
        <div className='ultra-container'>
            <NavBar/>
            <main>
                <Frases/>
                <div className='center-container'>
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    fecha={post.fecha}
                    pfp={post.pfp}
                    content={post.content}
                    media={post.media}
                    score={post.score}
                    repost={post.repost}
                    comments={post.comments}
                />
                <ComentPost parentInfo={[post.username, post.id]}/>
                <div className="comments-section">
                {post.comments.length > 0 ? (
                    post.comments.map((element:any) => (
                        <Post
                            key={element.id}
                            id={element.id}
                            username={post.username}
                            fecha={element.fecha}
                            pfp={post.pfp}
                            content={element.content}
                            media={element.media}
                            score={element.score}
                            repost={element.repost}
                            comments={element.comments}
                        />
                    ))) : (<h4>Bazinga</h4>
                )}
                </div>
            </div>
            <Frases/>
            </main>
        </div>
    )
}

export default PostPreview