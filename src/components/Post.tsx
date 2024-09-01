import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";

type Props = {
  username: string;
  content: string;
  media: string | null;
  score: number;
  repost: number;
  comments: number;
};


const UserFeed = ({ username, content, media, score, repost, comments }: Props) => {
  return (
    <div className='post-container'>
      <div className='post-display-top'>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center'}}>
            <img className='post-pfp' src='https://i.pinimg.com/originals/37/8a/27/378a270e775265622393da8c0527417e.jpg'/>
        </div>
        <div className='post-username'>
            {username}
            {media}
        </div>
      </div>
      <div className='post-text'>{content}</div>
      <div className='post-display-bottom'>
        <div className='post-score'>
            <IoMdAdd className='post-buttons'/>
            <h4>{score}</h4>
            <IoMdRemove className='post-buttons'/>
        </div>
        <div className='post-score'>
          <IoMdRepeat className='post-buttons'/>
          <h4>{repost}</h4>
        </div>
        <div className='post-score'>
          <FaComment className='post-buttons'/>
          <h4>{comments}</h4>
        </div>
          <IoMdShare className='post-buttons'/>
      </div>
    </div>
  );
};

export default UserFeed;
