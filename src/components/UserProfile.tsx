import './ComStyles.css'
import { useUser } from '../App';

const UserProfile = () => {
    const {user} = useUser();

    return (
        <div className='up-general-container'>
            <img className='up-banner' src={user?user.userInfo.banner:''}/>
            <div className='up-pfp-container'>
                <img className='up-pfp' src={user?user.userInfo.pfp:''}/>
                <button className='up-edit-btn'>Editar Perfil</button>
            </div>
            <h4 className='up-username'>{user?user.username:''}</h4>
            <h5 className='up-desc'>
                {user?user.userInfo.description:''}
            </h5>
        </div>
    );
}

export default UserProfile;