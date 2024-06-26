import React,{useState, useEffect} from 'react';
import useStore from './store/store';
import { FaStar } from "react-icons/fa6";
import { FaCodeFork } from "react-icons/fa6";
import './Repositories.css'
import Followers from './Followers';
import Following from './Following';
const Repositories = () =>{
    const repositories = useStore((state) => state.repositories);
    const user = useStore((state) => state.user);
    const followers = useStore((state) => state.followers);
    const following = useStore((state) => state.following);
    const setRepositories = useStore((state) => state.setRepositories);
    const setFollowers = useStore((state) => state.setFollowers);
    const setFollowing = useStore((state) => state.setFollowing);

   useEffect(() =>{
    if (user) {
        fetchRepositories(user.login);
    }

   }, [user]);
   
   const fetchRepositories = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=30`);
        if (!response.ok){
            throw new Error('there is a Network  problem' + response.statusText);
        }
        const reposData = await response.json();
        setRepositories(reposData);

    }catch (error){
        console.error('there was an error');
    }
   };
   return (
    <div>
        <h2>Repositories (30)</h2>
        <div className="repositories-list">
            {repositories.map((repo) =>(
            <div key={repo.id} className="repository-item">
                <div className="repo-info">
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                </div>
                <div className='repo-stats'>
                    <span><FaCodeFork />: {repo.forks_count}</span>
                    <span><FaStar /> :{repo.stargazers_count}</span>
                </div>
            </div>
            ))}
        </div>
        <Followers />
      <Following />
    </div>
   )
}   

export default Repositories;
