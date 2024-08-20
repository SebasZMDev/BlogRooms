import './ComStyles.css'

const UserProfile = () => {
    return (
        <div className='up-general-container'>
            <img className='up-banner' src='https://preview.redd.it/egkmduerfbtc1.jpeg?width=1366&format=pjpg&auto=webp&s=f94270329279a04a0e44f72230cf2ab069c499dd'/>
            <div className='up-pfp-container'>
                <img className='up-pfp' src='https://i.pinimg.com/originals/37/8a/27/378a270e775265622393da8c0527417e.jpg'/>
                <button className='up-edit-btn'>Editar Perfil</button>
            </div>
            <h4 className='up-username'>sebaszm</h4>
            <h5 className='up-desc'>
                La felicidad es como el clitoris, no se donde encontrarla
            </h5>
        </div>
    );
}

export default UserProfile;