import React, { useEffect } from 'react';
import useStore from './store/store';
import { IoUnlink } from "react-icons/io5";
import './follow.css';

const Following = () => {
  const user = useStore((state) => state.user);
  const following = useStore((state) => state.following);
  const setFollowing = useStore((state) => state.setFollowing);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user) {
        try {
          const response = await fetch(`https://api.github.com/users/${user.login}/following?per_page=30`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const followingData = await response.json();
          setFollowing(followingData);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };

    fetchFollowing();
  }, [user, setFollowing]);

  return (
    <div className="followers-following">
      <h2>Following</h2>
      <div className="users-grid">
        {following.length > 0 ? (
          following.map((follow) => (
            <div key={follow.id} className="user-item">
              <img src={follow.avatar_url} alt={follow.login} className="avatar" />
              <div className="user-info">
                <h3>{follow.login}</h3>
                <a href={follow.html_url} target="_blank" rel="noopener noreferrer" className="button">
                <IoUnlink /> View on GitHub
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Ooops! {user?.login} is not following anyone yet.</p>
        )}
      </div>
    </div>
  );
};

export default Following;
