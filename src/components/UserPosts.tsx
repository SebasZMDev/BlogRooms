import "./ComStyles.css";
import { useState } from "react";
import Post from "../components/Post";
import { useUser } from "../App";
import { getUserInfo } from "../hooks/getUserInfo";

type Props= {
  userID: string
}


const UserPosts = ({userID}:Props) => {
  const { user } = useUser();
  const [btnPress, setBtnPress] = useState<number>(1);
  const { getUserPosts, getThisUser,getUserThisPost} = getUserInfo();
  const Posts = getUserPosts(user?.id || "")
  const thisUser = getThisUser(userID)
  const thisLikes = thisUser?.userInfo.likes?.map((element) => {
    return getUserThisPost(element.PUsername, element.PostID);
  });
  const ButtonPressed = (index: number) => {
    setBtnPress(index);
  };

  console.log(
    thisUser,
    thisLikes,
    'waaa'
  )


  return (
    <div className="posts-general-container">
      <div className="posts-btns-container">
        <button
          onClick={() => ButtonPressed(1)}
          className={btnPress == 1 ? "post-btns-selected" : "posts-btns"}
        >
          Posts
        </button>
        <button
          onClick={() => ButtonPressed(2)}
          className={btnPress == 2 ? "post-btns-selected" : "posts-btns"}
        >
          Media
        </button>
        <button
          onClick={() => ButtonPressed(3)}
          className={btnPress == 3 ? "post-btns-selected" : "posts-btns"}
        >
          Likes
        </button>
      </div>
      <div className="posts-container">
        {btnPress === 1 &&
          Posts?.slice()
            .reverse()
            .map((post) => (
              <Post
                key={post.id}
                id={post.id}
                eparent={post.eparent}
                userID={post.userID}
                fecha={post.fecha}
                content={post.content}
                media={post.media}
                score={post.score}
                negscore={post.negscore}
                repost={post.repost}
                comments={post.comments}
              />
            ))}
        {btnPress === 2 &&
          Posts?.slice()
            .reverse()
            .filter((post) => post.media?.length? post.media?.length:0>1)
            .map((post) => (
              <Post
                key={post.id}
                id={post.id}
                eparent={post.eparent}
                userID={post.userID}
                fecha={post.fecha}
                content={post.content}
                media={post.media}
                score={post.score}
                negscore={post.negscore}
                repost={post.repost}
                comments={post.comments}
              />
            ))}
            {btnPress === 3 &&
              thisLikes?.map((element) => (
                element?
                <Post
                  key={element.id}
                  id={element.id}
                  eparent={element.eparent}
                  userID={element.userID}
                  fecha={element.fecha}
                  content={element.content}
                  media={element.media}
                  score={element.score}
                  negscore={element.negscore}
                  repost={element.repost}
                  comments={element.comments}
                />:''
              ))}
      </div>
    </div>
  );
};

export default UserPosts;
