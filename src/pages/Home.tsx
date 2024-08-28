import '../styles/Home.css'
import NavBar from '../components/NavBar';
import Frases from '../components/Frases';
import CreatePost from '../components/CreatePost';
import UserFeed  from '../components/UserFeed';

const Home = () => {


  return (
    <>
      <NavBar/>
      <main>
        <Frases/>
        <div className='center-container'>
          <CreatePost/>
          <UserFeed>

          </UserFeed>
        </div>
        <Frases/>
      </main>
    </>
  )
}

export default Home;

