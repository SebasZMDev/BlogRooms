import '../styles/Home.css'
import NavBar from '../components/NavBar';
import Frases from '../components/Frases';
import CreatePost from '../components/CreatePost';
import UserFeed  from '../components/UserFeed';



interface Props {
  isLogin: boolean;
}


const Home:React.FC<Props> = ({isLogin}) => {



  return (
    <>
      <NavBar logueado={isLogin}/>
      <main>
        <Frases/>
        <div className='center-container'>
          <CreatePost logueado={isLogin}/>
          <UserFeed>

          </UserFeed>
        </div>
        <Frases/>
      </main>
    </>
  )
}

export default Home;

