import '../styles/Profile.css'
import NavBar from '../components/NavBar';
import Frases from '../components/Frases';
import UserProfile from '../components/UserProfile';
import UserPosts from '../components/UserPosts';

const Profile = () =>{
    return (
        <>
        <NavBar/>
        <main>
            <Frases/>
            <div className='user-profile-display'>
                <UserProfile/>
                <UserPosts/>
            </div>
            <Frases/>
        </main>
        </>
    );
}

export default Profile;