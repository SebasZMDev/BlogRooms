import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import ImgPreview from './ImgPreview';
import { useState } from 'react';
import { PostData } from '../App';

type Props = {
  id: string;
  userData: [id:string,username:string ,pfp:string]
  eparent: [UserName:string, PostID:string] | null;
  content: string;
  media: string[] | null;
  score: number;
  repost: number;
  comments: PostData[];
  fecha: string;
};



const UserFeed = ({ id, userData, eparent, content, media, score, repost, comments, fecha }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPreviewPage = location.pathname === '/pages/PostPreview';
  const [imgPrevDisplay,setImgPrevDisplay] = useState<boolean>(false)
  const [imgSrc,setImgSrc] = useState<string>('')

  const Preview = () => {
    if (!isPostPreviewPage) {
      navigate('/pages/PostPreview', {
        state: {
          id,
          userData,
          eparent,
          fecha,
          content,
          media,
          score,
          repost,
          comments
        }
      });
    }
  }

  const OpenImgPreview = (imgSrc:string) => {
    setImgSrc(imgSrc)
    setImgPrevDisplay(true)
  }

  const CloseImgPreview = () => {
    setImgSrc('')
    setImgPrevDisplay(false)
  }


  return (
    <div className='post-container' onClick={Preview}>
      <div className='post-display-top'>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center'}}>
            <img className='post-pfp' src={userData[2]?userData[2]:''}/>
        </div>
        <div className='post-username'>
            <h4>{userData[1]}</h4>
            <h6>{fecha}</h6>
        </div>
      </div>
      <div>
     <div className='post-text'>{content}</div>
        <div className='post-media'>
        {media ? media.map((img, index) => (
          <img
            onClick={()=>OpenImgPreview(img)}
            className='post-media-item'
            style={{ width: media.length < 2 ? '200%' : '', height: media.length < 2 ? '500px' : '' }}
            key={index}
            src={img}
            alt={`media-${index}`}
          />
        )) : ''}
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
          <h4>{comments?comments.length:0}</h4>
        </div>
          <IoMdShare className='post-buttons'/>
      </div>
      {imgPrevDisplay && <ImgPreview imgSrc={imgSrc} closeImg={CloseImgPreview}/>}
    </div>
  );
};

export default UserFeed;
