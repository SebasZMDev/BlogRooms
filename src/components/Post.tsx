import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import ImgPreview from './ImgPreview';
import { useState } from 'react';
import { IDContext, PostData, useUser } from '../App';
import { getUserInfo } from '../hooks/getUserInfo';
import { useSave } from '../hooks/useSave';


type Props = {
  id: string;
  userID: string;
  eparent: [PUsername:string, PostID:string] | null;
  content: string;
  media: string[] | null;
  score: IDContext[] | null;
  negscore: IDContext[] | null,
  repost: number;
  comments: PostData[];
  fecha: string;
};



const Post = ({ id, userID, eparent, content, media, score, negscore, repost, comments, fecha }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPreviewPage = location.pathname === '/pages/PostPreview';
  const {saveCurrentUser, saveUsersList} = useSave();
  const {user, usersList} = useUser();
  const [imgPrevDisplay,setImgPrevDisplay] = useState<boolean>(false)
  const [imgSrc,setImgSrc] = useState<string>('')
  const {getUsername, getUserPFP, getUserThisPost} = getUserInfo();
  const postData = getUserThisPost(userID, id)

  const Preview = () => {
    if (!isPostPreviewPage) {
      navigate('/pages/PostPreview', {
        state: {
          id,
          userID,
          eparent
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

  const VoteUpPost = () => {
    if (!postData || !postData.score || !postData.negscore) {
      return;
    }
    const alreadyLiked = postData?.score?.some(
      (element) => element.PUsername === user?.username && element.PostID === id
    );
    const alreadyDisliked = postData?.negscore?.some(
      (element) => element.PUsername === user?.username && element.PostID === id
    );
    if (alreadyDisliked){
      if (user) {
       const UpdatedList = postData.negscore.filter(
        (element)=> !(element.PUsername === user.username && element.PostID === id)
       )
       postData.negscore = UpdatedList
      }
    }
    if (alreadyLiked){
      if (user) {
        const UpdatedList = postData.score.filter(
          (element) => !(element.PUsername === user.username && element.PostID === id)
        );
        postData.score = UpdatedList;

        const updatedUserLikes = user.userInfo.likes?.filter((like) => !(like.PUsername === user.username && like.PostID === id));
        user.userInfo.likes = updatedUserLikes?updatedUserLikes:null;

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }
    }else{
      const newLike: IDContext = {
        PUsername: user?.username||'',
        PostID: id
      }
      if (user){
        const PostLikes = [...(postData?.score || []), newLike ]
        postData.score = PostLikes

        const updatedUserLikes = [...(user.userInfo.likes || []), newLike];
        user.userInfo.likes = updatedUserLikes;

        saveCurrentUser(user)
        const updatedList = usersList?.map(item => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList)
      }
    }
  }

  const VoteDownPost = () => {
    if (!postData||!postData.negscore||!postData.score){
      return
    }
    const alreadyDisliked = postData.negscore.some(
      (element)=>element.PUsername === user?.username && element.PostID === id
    );
    const alreadyLiked = postData.score.some(
      (element)=>element.PUsername === user?.username && element.PostID === id
    );
    if (alreadyLiked){
      if (user){
        const UpdatedList = postData.score.filter(
          (element)=>(element.PUsername === user.username && element.PostID === id)
        )
        postData.score = UpdatedList
      }
    }
    if (alreadyDisliked){
      if (user) {
        const UpdatedList = postData.negscore.filter(
          (element) => !(element.PUsername === user.username && element.PostID === id)
        );
        postData.negscore = UpdatedList;

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }
    }else{
      const newDislike: IDContext = {
        PUsername: user?.username||'',
        PostID: id
      }
      if (user){
        const PostDislikes = [...(postData?.negscore || []), newDislike ]
        postData.negscore = PostDislikes

        // quita el like
        const UpdatedList = postData.score.filter(
          (element) => !(element.PUsername === user.username && element.PostID === id)
        );
        postData.score = UpdatedList;

        // quita el like del usuario
        const updatedUserLikes = user.userInfo.likes?.filter((like) => !(like.PUsername === user.username && like.PostID === id));
        user.userInfo.likes = updatedUserLikes?updatedUserLikes:null;

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }

    }
}

  const showScore = () =>{
    console.log('Score',postData?.score)
    console.log('NegScore',postData?.negscore)
  }


  return (
    <div className='post-container' onClick={Preview}>
      <div className='post-display-top'>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center'}}>
            <img className='post-pfp' src={getUserPFP(user?.id||'')}/>
        </div>
        <div className='post-username'>
            <h4>{getUsername(user?.id||'')}</h4>
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
            <IoMdAdd onClick={VoteUpPost} className='post-buttons'/>
            <h4 onClick={showScore} >{postData?.score ? postData?.score.length - (postData.negscore ? postData.negscore.length : 0) : 0}</h4>
            <IoMdRemove onClick={VoteDownPost} className='post-buttons'/>
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

export default Post;
