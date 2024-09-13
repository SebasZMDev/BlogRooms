import "../styles/PostPreview.css";
import NavBar from "../components/NavBar";
import Frases from "../components/Frases";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import ComentPost from "../components/CommentPost";
import { getUserInfo } from "../hooks/getUserInfo";
import { useEffect } from "react";

const PostPreview = ({}) => {
  const location = useLocation();
  const { getUserThisPost } = getUserInfo();
  const post = location.state;
  const postData = getUserThisPost(post.userID, post.id);
  const ParentPost = getUserThisPost(
    postData?.eparent?.[0] || "",
    postData?.eparent?.[1] || ""
  );
  if (!post) {
    return <div>No post data available</div>;
  }

  useEffect(() => {}, []);

  return (
    <div className="ultra-container">
      <NavBar />
      <main>
        <Frases />
        <div className="center-container">
          <div className="comments-section">
            {ParentPost ? (
              <div className="parent-post-container">
                <div className="parent-post-aside"></div>
                <Post
                  key={ParentPost.id}
                  id={ParentPost.id}
                  userID={ParentPost.userID}
                  eparent={ParentPost.eparent}
                  fecha={ParentPost.fecha}
                  content={ParentPost.content}
                  media={ParentPost.media}
                  score={ParentPost.score}
                  negscore={ParentPost.negscore}
                  repost={ParentPost.repost}
                  comments={ParentPost.comments}
                />
              </div>
            ) : (
              ""
            )}
            {postData ? (
              <Post
                key={postData.id}
                id={postData.id}
                userID={postData.userID}
                eparent={postData.eparent}
                fecha={postData.fecha}
                content={postData.content}
                media={postData.media}
                score={postData.score}
                negscore={postData.negscore}
                repost={postData.repost}
                comments={postData.comments}
              />
            ) : (
              <p>Post not found</p>
            )}
            <ComentPost parentInfo={[post.userID, post.id]} />
            {postData?.comments?.map((element, index) => (
              <div
                className="parent-post-container"
                key={element.id || `comment-${index}`}
              >
                <div className="parent-post-aside"></div>
                <Post
                  id={element.id}
                  userID={element.userID}
                  eparent={element.eparent}
                  fecha={element.fecha}
                  content={element.content}
                  media={element.media}
                  score={element.score}
                  negscore={element.negscore}
                  repost={element.repost}
                  comments={element.comments}
                />
              </div>
            ))}
          </div>
        </div>
        <Frases />
      </main>
    </div>
  );
};

export default PostPreview;
