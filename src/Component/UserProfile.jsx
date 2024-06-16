import React, {useEffect} from 'react';
import useStore from './store/store';
import { FaLocationDot } from "react-icons/fa6";
import './UserProfile.css';
const UserProfile = () =>{
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const repositories = useStore((state) => state.repositories);
    
    useEffect(() => {
        const fetchDefaultUser = async () => {
            try{
                const response = await fetch('https://api.github.com/users/github');
                if (!response.ok){
                    throw new Error('there is a Network  problem' + response.statusText);
                }
                const userData = await response.json();
                setUser(userData);
    
        }catch (error){
            console.log('there was an error!', error);
        }
    };
    fetchDefaultUser();
}, [setUser]);
if (!user){
    return <div>Please Wait page is Loading....</div>;
}

    return (
        <div className="user-repo-container">
            <div className="user-profile">
                <img src={user.avatar_url} alt={user.login} className='avatar'/>
                <h2>{user.name || user.login}</h2>
                <p>{user.bio}</p>
                <a href={user.html_url} target='_blank'>View on Github</a>
               
                <div className="followers-following-count">
                <p className='location'><FaLocationDot />:{user.location}</p>
                    <span>Followers: {user.followers}</span>
                    <span>Following: {user.following}</span>
                    <span>Repositories: {user.public_repos}</span>
                </div>
                
            </div>
        </div>
    );

};

export default UserProfile;