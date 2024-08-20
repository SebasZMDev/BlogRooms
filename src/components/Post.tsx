import './ComStyles.css';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";



const UserFeed = ({}) => {
  return (
    <div className='post-container'>
      <div className='post-display-top'>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center'}}>
            <img className='post-pfp' src='https://i.pinimg.com/originals/37/8a/27/378a270e775265622393da8c0527417e.jpg'/>
        </div>
        <div className='post-username'>
            {'displayname '}|{' username'}
        </div>
      </div>
      <div className='post-text'>Conte un chiste y nadie se rio, ya se lo que se siente ser mujer</div>
      <div className='post-display-bottom'>
        <div className='post-score'>
            <IoMdAdd className='post-buttons'/>
            <h4 >0</h4>
            <IoMdRemove className='post-buttons'/>
        </div>
        <IoMdRepeat className='post-buttons'/>
        <FaComment className='post-buttons'/>
        <IoMdShare className='post-buttons'/>
      </div>
    </div>
  );
};

export default UserFeed;
