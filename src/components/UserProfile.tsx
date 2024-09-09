import './ComStyles.css'
import { useUser } from '../App';
import { useEffect, useState } from 'react';
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {useSave} from '../hooks/useSave'

const UserProfile = () => {
    const {user, usersList} = useUser();
    const {saveCurrentUser, saveUsersList} = useSave();
    const [editMode, setEditMode]=useState<boolean>(false);
    const [newDesc, setNewDesc]=useState<string>(user?.userInfo.description || '')
    const [savedPFP, setSavedPFP]=useState<string>('')
    const [savedBanner, setSavedBanner]=useState<string>('')
    const [prevIMG, setPrevIMG]=useState<string>('')


    const EnableEditMode = () => {
      setNewDesc(user?.userInfo.description||'')
      setEditMode(true)
      setSavedPFP(user?user.userInfo.pfp:'')
      setSavedBanner(user?user.userInfo.banner:'')
  }
  const SaveChanges = () => {
      setPrevIMG('')
      setEditMode(false)
      user?user.userInfo.description = newDesc:'';
      if (user){
        saveCurrentUser(user)
        const updatedList = usersList?.map(item =>
          item.id === user?.id ? user : item
        ) || [];
        saveUsersList(updatedList)
      }
  }

  useEffect(()=>{
    console.log(user)
    console.log(usersList)
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
      // Leer el archivo y convertirlo a una cadena Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        // Obtener la cadena Base64 del resultado
        const base64String = reader.result as string;
        // Actualizar el perfil del usuario dependiendo del tipo de imagen (pfp o banner)
        if (tipo === 'pfp') {
          if (user) {
            user.userInfo.pfp = base64String;
            setPrevIMG(base64String); // Establecer la URL de la imagen para una vista previa
          }
        } else if (tipo === 'banner') {
          if (user) {
            user.userInfo.banner = base64String;
            setPrevIMG(base64String); // Establecer la URL de la imagen para una vista previa
          }
        }
      };
      // Leer el archivo como una cadena Base64
      reader.readAsDataURL(file);
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
                    {user ? user.userInfo.description : newDesc}
                </h5>
                <textarea onChange={(e)=>ChangeDesc(e)} className="edit-up-desc" value={newDesc}  style={{display:editMode?'':'none'}}/>
            </div>
        </>
      </div>
    );
}

export default UserProfile;