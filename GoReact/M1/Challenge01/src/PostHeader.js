import React from 'react';

const PostHeader = () => (
  <div className="post-header">
    <div className="user-image">
      <img
        src="https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
        alt="Avatar icon"
        className="post-image"
      />
    </div>
    <div className="user-name">
      <p className="username">Murilo Teste</p>
      <p className="hours-ago">há 7 min</p>
    </div>
  </div>
);

export default PostHeader;
