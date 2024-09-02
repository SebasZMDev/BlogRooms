import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";

type Props = {
  username: string;
  pfp: string | null;
  fecha: string;
  content: string;
  media: string[] | null;
  score: number;
  repost: number;
  comments: number;
};


const UserFeed = ({ username, pfp, fecha, content, media, score, repost, comments }: Props) => {
  return (
    <div className='post-container'>
      <div className='post-display-top'>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center'}}>
            <img className='post-pfp' src={pfp?pfp:''}/>
        </div>
        <div className='post-username'>
            <h4>{username}</h4>
            <h6>{fecha}</h6>
        </div>
      </div>
      <div>
     <div className='post-text'>{content}</div>
        <div className='post-media'>
          {media?media.map((img,index)=>(
            <img className='post-media-item' key={index} src={img} alt={`media-${index}`}/>
          )):('')}
        </div>
      </div>
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
