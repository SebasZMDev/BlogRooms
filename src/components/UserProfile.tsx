import './ComStyles.css'
import { useUser } from '../App';
import { useState } from 'react';
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const UserProfile = () => {
    const {user} = useUser();
    const [editMode, setEditMode]=useState<boolean>(false);
    const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        console.log(file);
    };
    const EnableEditMode = () => {
        setEditMode(true)
    }
    const SaveChanges = () => {
        console.log(editMode)
        setEditMode(false)
    }
    const CancelChanges = () => {
        setEditMode(false)
    }

    return (
      <div className="up-general-container">
        <>
            <div className='relative'>
            <img className="up-banner" src={user ? user.userInfo.banner : ""} />
            <div className='edit-up-banner-text' style={{display:editMode?'':'none'}}>Cambiar Banner</div>
            <input className="edit-up-banner" type='File' style={{display:editMode?'':'none'}}/>
            </div>
            <div className="up-pfp-container">
              <div className='relative'>
                <img className="up-pfp" src={user ? user.userInfo.pfp : ""} />
                <div className='edit-up-pfp-text'  style={{display:editMode?'':'none'}}>
                    Cambiar Foto
                </div>
                <input className="edit-up-pfp" type='File'  style={{display:editMode?'':'none'}}/>
              </div>
              {editMode?
              (<div className='up-edit-buttons-container'>
                <IoMdSave onClick={SaveChanges} className='up-edit-buttons'/>
                <IoMdClose onClick={CancelChanges} className='up-edit-buttons'/>
              </div>)
              :
            (<button className="up-edit-btn" onClick={EnableEditMode}>Editar Perfil</button>)}
            </div>
            <h4 className="up-username">{user ? user.username : ""}</h4>
            <div className='relative'>
                <h5 className="up-desc">
                    {user ? user.userInfo.description : "Perdido en los BlogRooms"}
                </h5>
                <textarea className="edit-up-desc"  style={{display:editMode?'':'none'}}/>
            </div>
        </>
          {/* <>
            <img className="edit-up-banner"/>
            <div className="up-pfp-container">
              <input className="edit-up-pfp" type='File'/>
              <button className="up-edit-btn" onClick={EnableEditMode}>Editar Perfil</button>
            </div>
            <h4 className="up-username">{user ? user.username : ""}</h4>
            <textarea className="edit-up-desc"/>
          </> */}

      </div>
    );
}

export default UserProfile;