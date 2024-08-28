import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App';
import { UserType } from '../App'


const Login = () => {
  const {user, setUser} = useUser()
  //const [actualUser, setActualUser] = useState<UserType>()
  const [usersList, setUsersList] = useState<UserType[]>(
    () => {
      const savedUsers = localStorage.getItem('usersList');
      return savedUsers ? JSON.parse(savedUsers) : [];
    }
  );
  const [haveAccount, setHaveAccount] = useState<boolean>(true);
  const [emailVal, setEmailVal] = useState<string>('');
  const [nameVal, setNameVal] = useState<string>('');
  const [passwordVal, setPasswordVal] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const SignOrLog = () => {
    setHaveAccount(!haveAccount)
  }
    //  CREACION DE CUENTA
  const InputChange = (tipo:string, e:React.ChangeEvent<HTMLInputElement>) =>{
    if (tipo === "email") {
      setEmailVal(e.target.value);
    }
    if (tipo === "username") {
      setNameVal(e.target.value);
    }
    if (tipo === "password") {
      setPasswordVal(e.target.value);
    }
  }
  const CreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(nameVal)) {
      setErrorMsg('El nombre solo puede contener letras, números y guiones bajos.');
      return;
    }
    if (emailVal.length < 6) {
      setErrorMsg('El email debe tener al menos 6 caracteres');
      return;
    }
    if (passwordVal.length < 5) {
      setErrorMsg('La contraseña debe tener al menos 5 caracteres');
      return;
    }
    if (nameVal.length < 3) {
      setErrorMsg('El nombre debe tener al menos 3 caracteres');
      return;
    }
    const emailExists = usersList.some(user => user.email === emailVal);
    const nameExists = usersList.some(user => user.username === nameVal);
    if (emailExists) {
      setErrorMsg("El correo ya existe");
      return;
    }
    if (nameExists) {
      setErrorMsg("El nombre ya existe");
      return;
    }
    setErrorMsg('');
    const newUser: UserType = {
      id: "U" + (usersList.length + 1),
      email: emailVal,
      username: nameVal,
      password: passwordVal,
      userInfo: {
        pfp: ".././src/images/default-pfp.jpg",
        banner: ".././src/images/default-banner.jpg",
        description: "",
        posts: [],
        likes: []
      }
    };

    const updatedUsersList = [...usersList, newUser];
    setUsersList(updatedUsersList);
    setUser(newUser);
    localStorage.setItem('usersList', JSON.stringify(updatedUsersList));
    localStorage.setItem('actualUser', JSON.stringify(newUser));
    navigate('/pages/Home', { state: { refresh: true } });
    window.location.reload();
  };


  return (
    <div className="mega-container" style={{ backgroundColor: "#303030" }}>
      <div className="general-container" >
        <div className="logo-container">
          <div className="centro icon" style={{ color: "#FDFD96" }} onClick={()=>console.log(user)}>
            <svg
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
          </div>
          <div>
            <br />
            <hr></hr>
            <br />
            <h4>BlogRooms</h4>
            <h5>
              Bienvenido a los BlogRooms, un espacio olvidado en el interntet,
              donde podras expresarte libremente.
            </h5>
          </div>
        </div>

        {haveAccount ? (
          <div className="login-container centro">
            <form className="login-form">
              <h2>BlogRooms</h2>
              <input placeholder="Username or email"></input>
              <input placeholder="Password"></input>
              <button>Entrar</button>
              <a>Olvidaste la contraseña?</a>
            </form>
            <div className="sign-up centro">
              <h5>No tienes cuenta? </h5>
              <a onClick={SignOrLog}>Unete</a>
            </div>
          </div>
        ) : (
          <div className="sign-up-container centro">
            <form className="sign-up-form" onSubmit={CreateUser}>
              <h2>BlogRooms</h2>
              <input onChange={(e)=>InputChange('email', e)} type="email" placeholder="Email"></input>
              <input onChange={(e)=>InputChange('username', e)} type="text" placeholder="Username"></input>
              <input onChange={(e)=>InputChange('password', e)} type="password" placeholder="Password"></input>
              <button type="submit">Registrarse</button>
              <p style={{color:'red', fontSize:'10px', maxWidth:'150px', margin:'auto'}}>{errorMsg}</p>
            </form>
            <div className="sign-up centro">
              <h5>O prefieres</h5>
              <a onClick={SignOrLog}>Iniciar Sesion</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
