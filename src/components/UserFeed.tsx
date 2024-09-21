import { useUser } from '../App';
import './ComStyles.css';
import { BotsList } from './Extra';
import Post from './Post';

const UserFeed = () => {
  // Usar flatMap para aplanar los arrays de posts
  const {usersList} = useUser();
  const Feed = usersList?.flatMap((element) => element.userInfo.posts);
  return (
    <div className='uf-container'>
      {Feed &&
        Feed.map((post) => (
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
        ))
      }
    </div>
  );
};

export default UserFeed;
