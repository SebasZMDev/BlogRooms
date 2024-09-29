import './ComStyles.css'
import { useUser } from "../App"
import { useNavigate } from 'react-router-dom';


const UsersPanel = () =>{
    const {usersList} = useUser();
    const navigate =  useNavigate();
    const toThisProfile = (ThisID:string) => {
        navigate(`/pages/Profile/${ThisID}`)
    }

    return (
        <div className='listpanel-div'>
            {usersList?.map((element, index)=>
            (
                <div className='listpanel-display' key={index+'z'} onClick={()=>toThisProfile(element.id)}>
                    <img className='listpanel-pfp' src={element.userInfo.pfp}/>
                    <h3 className='listpanel-name'>{element.username}</h3>
                </div>
            )
            )}
        </div>
    )
}

export default UsersPanel;