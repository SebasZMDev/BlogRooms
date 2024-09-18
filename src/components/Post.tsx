import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import ImgPreview from './ImgPreview';
import { useEffect, useState } from 'react';
import { IDContext, PostData, useUser } from '../App';
import { getUserInfo } from '../hooks/getUserInfo';
import { useSave } from '../hooks/useSave';
import { FaChevronDown } from "react-icons/fa";
import SubScreen from './subScreen';



type Props = {
  id: string;
  userID: string;
  eparent: [UserID:string, PostID:string] | null;
  content: string;
  media: string[] | null;
  score: IDContext[] | null;
  negscore: IDContext[] | null,
  repost: string[];
  comments: PostData[];
  fecha: string;
};



const Post = ({ id, userID, eparent, content, media, repost, comments, fecha }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPreviewPage = location.pathname === `/pages/PostPreview/${userID}/${id}`;
  const isPostProfilePage = location.pathname === `/pages/Profile/${userID}`;
  const [settingOpen, setSettingOpen] = useState<boolean>(false)
  const {saveCurrentUser, saveUsersList} = useSave();
  const {user, usersList} = useUser();
  const { getThisUser, getUsername, getUserPFP, getUserThisPost, getUserPosts} = getUserInfo();
  const postData = getUserThisPost(userID, id)
  const tipo = postData?.postType;
  const [imgPrevDisplay, setImgPrevDisplay] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [coloUp, setColorUp] = useState<boolean>(false);
  const [colorDown, setColorDown] = useState<boolean>(false);
  const [RePosted, setReposted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');

  const Preview = () => {
    if (!isPostPreviewPage) {
      navigate(`/pages/PostPreview/${postData?.userID}/${postData?.id}`, {
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
      (element) => element.UserID === user?.id && element.PostID === id
    );
    const alreadyDisliked = postData?.negscore?.some(
      (element) => element.UserID === user?.id && element.PostID === id
    );
    if (alreadyDisliked){
      if (user) {
       const UpdatedList = postData.negscore.filter(
        (element)=> !(element.UserID === user.id && element.PostID === id)
       )
       postData.negscore = UpdatedList
      }
      setColorDown(false)
    }
    if (alreadyLiked){
      if (user) {
        const UpdatedList = postData.score.filter(
          (element) => !(element.UserID === user.id && element.PostID === id)
        );
        postData.score = UpdatedList;

        const updatedUserLikes = user.userInfo.likes?.filter((like) => !(like.UserID === user.id && like.PostID === id));
        user.userInfo.likes = updatedUserLikes?updatedUserLikes:null;

        setColorUp(false)

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }
    }else{
      const newLike: IDContext = {
        UserID: user?.id||'',
        PostID: id
      }
      if (user){
        const PostLikes = [...(postData?.score || []), newLike ]
        postData.score = PostLikes

        const updatedUserLikes = [...(user.userInfo.likes || []), newLike];
        user.userInfo.likes = updatedUserLikes;

        setColorUp(true)

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
      (element)=>element.UserID === user?.id && element.PostID === id
    );
    const alreadyLiked = postData.score.some(
      (element)=>element.UserID === user?.id && element.PostID === id
    );
    if (alreadyLiked){
      if (user){
        const UpdatedList = postData.score.filter(
          (element)=>(element.UserID === user.id && element.PostID === id)
        );
        setColorUp(false)
        postData.score = UpdatedList
      }
    }
    if (alreadyDisliked){
      if (user) {
        const UpdatedList = postData.negscore.filter(
          (element) => !(element.UserID === user.id && element.PostID === id)
        );
        postData.negscore = UpdatedList;

        setColorDown(false)

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }
    }else{
      const newDislike: IDContext = {
        UserID: user?.id||'',
        PostID: id
      }
      if (user){
        const PostDislikes = [...(postData?.negscore || []), newDislike ]
        postData.negscore = PostDislikes

        // quita el like
        const UpdatedList = postData.score.filter(
          (element) => !(element.UserID === user.id && element.PostID === id)
        );
        postData.score = UpdatedList;

        // quita el like del usuario
        const updatedUserLikes = user.userInfo.likes?.filter((like) => !(like.UserID === user.id && like.PostID === id));
        user.userInfo.likes = updatedUserLikes?updatedUserLikes:null;

        setColorDown(true)

        saveCurrentUser(user);
        const updatedList = usersList?.map((item) => item.id === user.id ? user : item) || [];
        saveUsersList(updatedList);
      }

    }
}

const Repost = () =>{
  if (user && postData){
    if (postData.postType=='repost'){
      return
    }else{
      const AlreadyReposted = postData?.repost.some((element)=>element == user.id)
    if (AlreadyReposted){
      const UpdatedRepost = postData.repost.filter(
        (element)=>(element === user.username)
      );
      const UpdatedPost = getUserPosts(userID)?.filter((element)=>element.postType !== 'repost' && element.id !== `${id}R`)
      user.userInfo.posts = UpdatedPost?UpdatedPost:user.userInfo.posts;
      setReposted(false)
      postData.repost = UpdatedRepost
      saveCurrentUser(user);
      const updatedRepost = usersList?.map((item) => item.id === user.id ? user : item) || [];
      saveUsersList(updatedRepost);
      setOpenModal(true)
      setModalMsg('Reposteado con exito')
    }else{
        getUserPosts(userID)?.map((element)=>{
          if (element.id == postData?.id) {
            const newRepost = { ...element }
            newRepost.postType = 'repost'
            newRepost.id += 'R'
            postData.repost = [...postData.repost, userID]
            user.userInfo.posts = [...user.userInfo.posts, newRepost]
          }
        })
        setReposted(true)
        saveCurrentUser(user)
        const updatedList = usersList?.map(item =>
        item.id === user?.id ? user : item) || [];
        saveUsersList(updatedList)
      }
    }
  }
}

const OpenPostStngs = () => {
  setSettingOpen(!settingOpen)
}

const DeletePost = () => {
  if (user) {
    const updatedArray = getUserPosts(userID)?.filter((element) => element.id !== id) || [];

    user.userInfo.posts = updatedArray;

    saveCurrentUser(user);

    const updatedList = usersList?.map(item =>
      item.id === user?.id ? user : item
    ) || [];
    if (!isPostProfilePage) {
      navigate(`/pages/Home`)
    }
    saveUsersList(updatedList);
  }
};

const ClearLikes = () => {
  const Post = getUserPosts(userID)?.find((element) => element.id == id);
  if (Post && Post.score) {
    Post.score.map((element)=>{
      getThisUser(element.UserID)
    });
  }
}


useEffect(() => {
  if (postData && user) {
    const Liked = postData.score?.some(
      (element) => element.UserID === user.id && element.PostID === id
    );
    const Disliked = postData.negscore?.some(
      (element) => element.UserID === user.id && element.PostID === id
    );
    setColorUp(!!Liked);
    setColorDown(!!Disliked);
  }
}, [postData, user]);

  return (
<div className='post-container' onClick={Preview}>
  <div className='post-display-top'>
    <div style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
      <img className='post-pfp' src={getUserPFP(user?.id || '')} />
    </div>
    <div className='post-username'>
      <h4 onClick={ClearLikes}>{getUsername(user?.id || '')}</h4>
      <h5>{tipo=='repost'?'Repost':''}</h5>
      <div style={{display:'flex', justifyContent:'end', gridGap:'10px'}}>
        <h6>{fecha}</h6>
        <div className='relative'>
          <FaChevronDown className='post-stngs' onClick={(e)=>{e.stopPropagation(); OpenPostStngs();}}/>
          <span className='post-stngs-bg' style={{display:settingOpen?'':'none'}}>
            <ul className='post-stngs-item' onClick={(e)=>{e.stopPropagation(); DeletePost();}}>Borrar</ul>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className='post-text'>{content}</div>
    <div className='post-media'>
      {media ? media.map((img, index) => (
        <img
          onClick={(e) => {
            e.stopPropagation();
            OpenImgPreview(img);
          }}
          className='post-media-item'
          style={{ width: media.length < 2 ? '200%' : '', height: media.length < 2 ? '200%' : '' }}
          key={index}
          src={img}
          alt={`media-${index}`}
        />
      )) : ''}
    </div>
  </div>
  <div className='post-display-bottom'>
    <div className='post-score'>
      <IoMdAdd style={coloUp ? { color: 'green' } : {}} onClick={(e) => { e.stopPropagation(); VoteUpPost();}} className='post-buttons' />
      <h4>{postData?.score ? postData?.score.length - (postData.negscore ? postData.negscore.length : 0) : 0}</h4>
      <IoMdRemove style={colorDown? {color: 'red'}:{}} onClick={(e) => { e.stopPropagation(); VoteDownPost();}} className='post-buttons' />
    </div>
    <div className='post-score'>
      <IoMdRepeat style={RePosted?{color: 'green'}:{}} onClick={(e)=>{e.stopPropagation(); Repost();}} className='post-buttons' />
      <h4>{repost ? repost.length : 0}</h4>
    </div>
    <div className='post-score'>
      <FaComment className='post-buttons' />
      <h4>{comments ? comments.length : 0}</h4>
    </div>
    <IoMdShare className='post-buttons' />
  </div>
  <div onClick={(e)=>{e.stopPropagation();}}>
  <SubScreen Displ={openModal} Msg={modalMsg}/>
  </div>
  {imgPrevDisplay && <ImgPreview imgSrc={imgSrc} closeImg={CloseImgPreview} />}
</div>
  );
};

export default Post;
