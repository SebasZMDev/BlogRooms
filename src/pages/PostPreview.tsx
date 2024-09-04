import NavBar from "../components/NavBar";
import Frases from "../components/Frases";
import Post from '../components/Post'
import { useLocation } from "react-router-dom";
import ComentPost from "../components/ComentPost";


const PostPreview = ({}) => {
    const location = useLocation();
    const post = location.state;

    if (!post) {
      return <div>No post data available</div>;
    }

    return(
        <div className='ultra-container'>
            <NavBar/>
            <main>
                <Frases/>
                <div className='center-container'>
                <Post
                    key={post.id}
                    username={post.username}
                    fecha={post.fecha}
                    pfp={post.pfp}
                    content={post.content}
                    media={post.media}
                    score={post.score}
                    repost={post.repost}
                    comments={post.comments.length}
                />
                <ComentPost/>
                <div className="comments-section">

                </div>
                </div>
                <Frases/>
            </main>
        </div>
    )
}

export default PostPreview