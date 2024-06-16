import React, { useEffect } from 'react';
import useStore from './store/store';
import './follow.css';
import { IoUnlink } from "react-icons/io5";
const Followers = () => {
  const user = useStore((state) => state.user);
  const followers = useStore((state) => state.followers);
  const setFollowers = useStore((state) => state.setFollowers);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (user) {
        try {
          const response = await fetch(`https://api.github.com/users/${user.login}/followers?per_page=30`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const followersData = await response.json();
          setFollowers(followersData);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };

    fetchFollowers();
  }, [user, setFollowers]);

  return (
    <div className="followers-following">
      <h2>Followers</h2>
      <div className="users-grid">
        {followers.length > 0 ? (
          followers.map((follower) => (
            <div key={follower.id} className="user-item">
              <img src={follower.avatar_url} alt={follower.login} className="avatar" />
              <div className="user-info">
                <h3>{follower.login}</h3>
                <a href={follower.html_url} target="_blank"  className="button">
                <IoUnlink /> View on GitHub
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Ooops! {user?.login} is not followed by anyone yet.</p>
        )}
      </div>
    </div>
  );
};

export default Followers;
