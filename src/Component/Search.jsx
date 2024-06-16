import React, {useState} from 'react';
import useStore from './store/store';
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

            
            setFollowers([]);
            setFollowing([]);
        }
        catch (error){
            console.log('There is an error!', error);
        }
    };
    return (
        <div>
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