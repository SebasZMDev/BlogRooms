import './ComStyles.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiSearch } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { useUser } from '../App';


const NavBar = () => {
  const {user, setUser, usersList, isUserLogged, setIsUserLogged} = useUser();
  const [rotacion, setRotacion] = useState<number>(0);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [menuAbierto,setMenuAbierto] = useState<boolean>(false);
  const navigate = useNavigate();
  const AbrirMenu = () => {setMenuAbierto(!menuAbierto)}
  const userID = user?.id
  const RotacionInfinita = () => {
    if (cooldown) return;
    setRotacion(prevRotacion => prevRotacion + 90);
    if (rotacion === 9000) {
      setRotacion(0);
    }
    setCooldown(true);
    setTimeout(() => setCooldown(false), 750);
  };

  const toUserProfile = () => {
    navigate(`/pages/Profile/${user?.id}`),{
      state: {
        userID
      }
    };
  }

  const CerrarSesion = () =>{
    setUser(null)
    setIsUserLogged(false)
    localStorage.removeItem('actualUser');
    navigate('/pages/Login')
    window.location.reload()
  }

  return (
    <div className='nv-nav-bar'>
      <div className='nv-icon-container'>
        <Link to="/pages/Home">
        <svg
          onMouseOut={RotacionInfinita}
          className="nv-icon cursor"
          style={{ color: '#FDFD96', transform: `rotate(${rotacion}deg)` }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          role="img"
          viewBox="0 0 24 24"
          height="200px"
          width="200px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.011 0v8.406H8.61V0zm15.39 0v8.406H24V0zM8.972.658l.012 7.869 2.54 2.43.007-5.564zm6.066 0-2.555 4.735.004 5.564 2.54-2.43zM.332 8.768l5.52 2.677 5.655-.006-2.773-2.67zm14.944 0L12.53 11.49l5.655-.09 5.498-2.631zm-9.323 3.855L.318 15.232h8.405l2.748-2.722zm6.565-.113 2.747 2.722h8.402l-5.586-2.609zm-1.006.533-2.54 2.43-.011 7.873 2.555-4.74zm.964 0-.008 5.564 2.559 4.74-.011-7.874zM0 15.598V24h8.598v-8.402zm15.39 0V24h8.598v-8.402z"></path>
        </svg>
        </Link>
      </div>

      <div className='nv-search-bar'>
        <input className='nv-search-input' name='search-bar'/>
        <HiSearch color='#FDFD96' className='nv-search-icon cursor'/>
      </div>

      {isUserLogged ? (
        <div className='nv-user-buttons-display'>
          <FaBell color='#FDFD96' className='nv-user-button nv-bell cursor' onClick={()=>{console.log(user)}}/>
          <Link to={`/pages/Profile/${user?.id}`}>
            <h5 className='nv-user-name'>{user?.username}</h5>
          </Link>
          <div className='nv-mini-menu'>
            <img onClick={AbrirMenu} className='nv-user-button nv-pfp cursor' src={user?user.userInfo.pfp:''}/>
            <span className='nv-user-config' style={menuAbierto? {}:{display:'none'}}>
            <ul onClick={toUserProfile}>Perfil</ul>
            <ul onClick={CerrarSesion}>Cerrar Sesion</ul>
            </span>
          </div>
        </div>
      ) : (
        <div className='centro'>
          <Link to="/pages/Login">
            <button className='nv-login-btn'>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
