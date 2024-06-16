import React, {useState} from 'react';
import useStore from './store/store';
import './Header/Header.css'
const Search = () => {
    const [username, setUsername] = useState('');
    const setUser = useStore((state) => state.setUser);
    const setRepositories = useStore((state) => state.setRepositories);
    const setFollowers = useStore((state) => state.setFollowers);
    const setFollowing = useStore((state) => state.setFollowing);


    const handleSearch = async () =>{
        try{
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok){
                throw new Error('there is a Network  problem' + userResponse.statusText);
            }
            const userData = await userResponse.json();
            setUser(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=30`);
        if (!reposResponse.ok){
            throw new Error('there is a Network  problem' + reposResponse.statusText);
        }
        const reposData = await reposResponse.json();
        setRepositories(reposData);

            
            setFollowers([]);
            setFollowing([]);
        }
        catch (error){
            console.log('there was an error!', error);
        }
    };
    return (
        <div className='search-container'>
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            placeholder= "Search Github user"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;