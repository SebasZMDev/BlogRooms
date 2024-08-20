import '../styles/Login.css'

function Login() {

  return (
    <>
        <div className='general-container' style={{backgroundColor:'#303030'}}>
          <div className='logo-container'>
            <div className="centro icon" style={{ color: '#FDFD96' }}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M.011 0v8.406H8.61V0zm15.39 0v8.406H24V0zM8.972.658l.012 7.869 2.54 2.43.007-5.564zm6.066 0-2.555 4.735.004 5.564 2.54-2.43zM.332 8.768l5.52 2.677 5.655-.006-2.773-2.67zm14.944 0L12.53 11.49l5.655-.09 5.498-2.631zm-9.323 3.855L.318 15.232h8.405l2.748-2.722zm6.565-.113 2.747 2.722h8.402l-5.586-2.609zm-1.006.533-2.54 2.43-.011 7.873 2.555-4.74zm.964 0-.008 5.564 2.559 4.74-.011-7.874zM0 15.598V24h8.598v-8.402zm15.39 0V24h8.598v-8.402z"></path></svg></div>
            <div>
            <br/>
              <hr></hr>
              <br/>
              <h4>BlogRooms</h4>
              <h5>Bienvenido a los BlogRooms, un espacio olvidado en el interntet, donde podras expresarte libremente.</h5>
            </div>
          </div>

          <div className='login-container centro'>
            <form className='login-form'>
              <h2>BlogRooms</h2>
              <input placeholder='Phone number, username or email'></input>
              <input placeholder='Password'></input>
              <button>Entrar</button>
              <a>Olvidaste la contraseña?</a>
            </form>
            <div className='sign-up centro'>
              <h5>No tienes cuenta? </h5><a>Unete</a>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login
