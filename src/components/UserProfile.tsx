import './ComStyles.css'
import { useUser } from '../App';
import { useEffect, useState } from 'react';
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const UserProfile = () => {
    const {user,setUser, usersList,setUsersList} = useUser();
    const [editMode, setEditMode]=useState<boolean>(false);
    const [newDesc, setNewDesc]=useState<string>(user?.userInfo.description || '')
    const [savedPFP, setSavedPFP]=useState<string>('')
    const [savedBanner, setSavedBanner]=useState<string>('')
    const [prevIMG, setPrevIMG]=useState<string>('')


    const EnableEditMode = () => {
      setEditMode(true)
      setSavedPFP(user?user.userInfo.pfp:'')
      setSavedBanner(user?user.userInfo.banner:'')
  }


// PENDIENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

  const SaveChanges = () => {
      setPrevIMG('')
      setEditMode(false)
      user?user.userInfo.description = newDesc:'';
      setUser(user);
      localStorage.setItem('actualUser', JSON.stringify(user));
      () => {
        const savedUsers = localStorage.getItem('usersList');
        return savedUsers ? JSON.parse(savedUsers) : [];
      }
      const UpdateList = usersList?.map((usuario) => {
        if(usuario.id === user?.id){
          usuario=user
        }
      })

  }
  useEffect(()=>{
    const UpdateList = usersList?.map(usuario =>
      usuario.id === user?.id ? user : user
    );
    console.log(UpdateList)
  },[user])




  const CancelChanges = () => {
      setPrevIMG('')
      user?user.userInfo.pfp=savedPFP:'';
      user?user.userInfo.banner=savedBanner:'';
      setEditMode(false)
  }
    const handleIMGChange = (
      tipo: string,
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.");
          e.target.value = "";
          return;
        }
        const imageUrl = URL.createObjectURL(file);
        if (tipo=='pfp'){
          user?user.userInfo.pfp=imageUrl:'';
          setPrevIMG(imageUrl)
        }
        if (tipo=='banner'){
          user?user.userInfo.banner=imageUrl:'';
          setPrevIMG(imageUrl)
        }
      }
    };
    const ChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewDesc(e.target.value)
    };




    return (
      <div className="up-general-container">
        <>
            <div className='relative'>
            {editMode?(<img className="up-banner" src={user?user.userInfo.banner:""} />)
            :(<img className="up-banner" src={prevIMG?prevIMG:user?user.userInfo.banner:''} />)}
            <div className='edit-up-banner-text' style={{display:editMode?'':'none'}}><h5>Cambiar Banner</h5></div>
            <input onChange={(e)=>handleIMGChange('banner',e)} accept="image/png, image/jpeg, image/jpg" className="edit-up-banner" type='File' style={{display:editMode?'':'none'}}/>
            </div>
            <div className="up-pfp-container">
              <div className='relative'>
              {editMode?(<img className="up-pfp" src={user?user.userInfo.pfp:""} />)
              :(<img className="up-pfp" src={prevIMG?prevIMG:user?user.userInfo.pfp:""} />)}
                <div className='edit-up-pfp-text' style={{display:editMode?'':'none'}}>
                    <h5>Cambiar Foto</h5>
                </div>
                <input onChange={(e)=>handleIMGChange('pfp',e)} accept="image/png, image/jpeg, image/jpg" className="edit-up-pfp" type='File'  style={{display:editMode?'':'none'}}/>
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
                <textarea onChange={(e)=>ChangeDesc(e)} className="edit-up-desc"  style={{display:editMode?'':'none'}}/>
            </div>
        </>
      </div>
    );
}

export default UserProfile;