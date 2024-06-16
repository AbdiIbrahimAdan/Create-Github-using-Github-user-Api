import React, {useEffect} from 'react';
import useStore from './store/store';
import './UserProfile.css';
const UserProfile = () =>{
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const repositories = useStore((state) => state.repositories);
    
    useEffect(() => {
        const fetchDefaultUser = async () => {
            try{
                const userResponse = await fetch(`https://api.github.com/users/$github`);
                if (!userResponse.ok){
                    throw new Error('there is a Network  problem' + userResponse.statusText);
                }
                const userData = await userResponse.json();
                setUser(userData);
    
        }catch (error){
            console.log('There is an error!', error);
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
                <p>Location:{user.location}</p>
                <div className="followers-following-count">
                    <span>Followers: {user.followers}</span>
                    <span>Following: {user.following}</span>
                    <span>Repositories: {user.public_repos}</span>
                </div>
                <a href={user.html_url} target='_blank'>View on Github</a>
            </div>
        </div>
    );

};

export default UserProfile;