import NavBar from "../components/NavBar";
import Frases from "../components/Frases";
import Post from '../components/Post'
import { useLocation } from "react-router-dom";
import ComentPost from "../components/CommentPost";
import { useEffect } from "react";
import { PostData } from "../App";
import { getUserInfo } from "../hooks/getUserInfo";


const PostPreview = ({}) => {
    const location = useLocation();
    const post = location.state;
    const {userThisPost} = getUserInfo()

    if (!post) {
      return <div>No post data available</div>;
    }
     useEffect(()=>{

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
                    userID={post.userI}
                    eparent={post.eparent}
                    fecha={post.fecha}
                    content={post.content}
                    media={post.media}
                    score={post.score}
                    repost={post.repost}
                    comments={post.comments}
                />
                <ComentPost parentInfo={[post.userID, post.id]}/>
                <div className="comments-section">
                {userThisPost(post.userID, post.id)?.comments?.map((element) => (
                <Post
                    key={element.id}
                    id={element.id}
                    userID={element.userID}
                    eparent={element.eparent}
                    fecha={element.fecha}
                    content={element.content}
                    media={element.media}
                    score={element.score}
                    repost={element.repost}
                    comments={element.comments}
                />
                ))}
                </div>
            </div>
            <Frases/>
            </main>
        </div>
    )
}

export default PostPreview